package com.vs.auth.service;

import com.vs.auth.model.OtpCode;
import com.vs.auth.repo.OtpRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.Random;

// Twilio imports (optional)
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
public class OtpService {

    private final Random random = new Random();

    // In-memory store for OTPs: mobile -> Entry
    private final java.util.concurrent.ConcurrentMap<String, Entry> store = new java.util.concurrent.ConcurrentHashMap<>();

    // Simple rate-limit tracking: mobile -> Rate
    private final java.util.concurrent.ConcurrentMap<String, Rate> rateMap = new java.util.concurrent.ConcurrentHashMap<>();

    @Value("${TEXTBELT_API_KEY:}")
    private String textbeltApiKey;

    @Value("${OTP_EXPIRY_MINUTES:5}")
    private long otpExpiryMinutes;

    @Value("${OTP_RATE_LIMIT_COUNT:3}")
    private int rateLimitCount;

    @Value("${OTP_RATE_LIMIT_WINDOW_MINUTES:15}")
    private long rateLimitWindowMinutes;

    private static class Entry {
        final String code;
        final Instant expiresAt;
        volatile boolean used;

        Entry(String code, Instant expiresAt){
            this.code = code;
            this.expiresAt = expiresAt;
            this.used = false;
        }
    }

    private static class Rate {
        int count;
        Instant windowStart;

        Rate(int count, Instant windowStart){
            this.count = count;
            this.windowStart = windowStart;
        }
    }

    public OtpService() {
        // defaults will be injected
        this.otpExpiryMinutes = 5;
        this.rateLimitCount = 3;
        this.rateLimitWindowMinutes = 15;
    }

    public String generateAndSave(String mobile) {
        String key = mobile;
        Instant now = Instant.now();

        // rate limiting
        Rate rate = rateMap.compute(key, (k, v) -> {
            if (v == null) return new Rate(1, now);
            if (v.windowStart.plus(rateLimitWindowMinutes, ChronoUnit.MINUTES).isBefore(now)) {
                // reset window
                v.count = 1;
                v.windowStart = now;
                return v;
            }
            v.count++;
            return v;
        });

        if (rate.count > rateLimitCount) {
            // exceed rate
            throw new IllegalStateException("rate_limited");
        }

        String code = String.format("%06d", random.nextInt(1_000_000));
        Instant expires = now.plus(otpExpiryMinutes, ChronoUnit.MINUTES);
        store.put(key, new Entry(code, expires));

        // send via Textbelt if configured
        if (textbeltApiKey != null && !textbeltApiKey.isBlank()) {
            try {
                sendViaTextbelt(mobile, code);
                System.out.println("[OTP SENT VIA TEXTBELT] to=" + mobile);
            } catch (Exception e) {
                System.err.println("[OTP SEND FAILED - TEXTBELT] " + e.getMessage());
            }
        } else {
            // fallback: log to server console
            System.out.println("[OTP SEND] mobile=" + mobile + " code=" + code);
        }

        return code;
    }

    public boolean verify(String mobile, String code) {
        Entry e = store.get(mobile);
        if (e == null) return false;
        if (e.used) return false;
        if (e.expiresAt.isBefore(Instant.now())) return false;
        if (!e.code.equals(code)) return false;
        e.used = true;
        // optional: remove entry
        store.remove(mobile);
        return true;
    }

    private void sendViaTextbelt(String mobile, String code) throws Exception {
        // use java.net.http.HttpClient (Java 11+)
        java.net.http.HttpClient client = java.net.http.HttpClient.newHttpClient();
        String message = "Your verification code is: " + code;
        String form = "phone=" + java.net.URLEncoder.encode(mobile, java.nio.charset.StandardCharsets.UTF_8)
                + "&message=" + java.net.URLEncoder.encode(message, java.nio.charset.StandardCharsets.UTF_8)
                + "&key=" + java.net.URLEncoder.encode(textbeltApiKey, java.nio.charset.StandardCharsets.UTF_8);

        java.net.http.HttpRequest request = java.net.http.HttpRequest.newBuilder()
                .uri(java.net.URI.create("https://textbelt.com/text"))
                .header("Content-Type", "application/x-www-form-urlencoded")
                .POST(java.net.http.HttpRequest.BodyPublishers.ofString(form))
                .build();

        java.net.http.HttpResponse<String> response = client.send(request, java.net.http.HttpResponse.BodyHandlers.ofString());
        // parse response JSON for success
        try {
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            java.util.Map<String, Object> map = mapper.readValue(response.body(), java.util.Map.class);
            Object success = map.get("success");
            if (!(success instanceof Boolean) || !((Boolean) success)) {
                throw new RuntimeException("textbelt_send_failed: " + response.body());
            }
        } catch (com.fasterxml.jackson.core.JsonProcessingException ex) {
            throw new RuntimeException("invalid_textbelt_response: " + response.body());
        }
    }
}
