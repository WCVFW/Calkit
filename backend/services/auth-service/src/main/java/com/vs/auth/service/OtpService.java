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

    private final OtpRepository otpRepository;
    private final Random random = new Random();

    @Value("${TWILIO_ACCOUNT_SID:}")
    private String twilioAccountSid;

    @Value("${TWILIO_AUTH_TOKEN:}")
    private String twilioAuthToken;

    @Value("${TWILIO_FROM:}")
    private String twilioFrom;

    public OtpService(OtpRepository otpRepository){
        this.otpRepository = otpRepository;
    }

    public String generateAndSave(String mobile){
        String code = String.format("%06d", random.nextInt(1_000_000));
        Instant expires = Instant.now().plus(5, ChronoUnit.MINUTES);
        OtpCode otp = new OtpCode(mobile, code, expires);
        otpRepository.save(otp);

        // If Twilio is configured, attempt to send SMS
        if(twilioAccountSid != null && !twilioAccountSid.isBlank() && twilioAuthToken != null && !twilioAuthToken.isBlank() && twilioFrom != null && !twilioFrom.isBlank()){
            try{
                Twilio.init(twilioAccountSid, twilioAuthToken);
                String text = "Your verification code is: " + code;
                Message.creator(new PhoneNumber(mobile), new PhoneNumber(twilioFrom), text).create();
                System.out.println("[OTP SENT VIA TWILIO] to=" + mobile);
            }catch(Exception e){
                System.err.println("[OTP SEND FAILED - TWILIO] " + e.getMessage());
            }
        } else {
            // Fallback: print OTP to console (development)
            System.out.println("[OTP SEND] mobile=" + mobile + " code=" + code);
        }

        return code;
    }

    public boolean verify(String mobile, String code){
        Optional<OtpCode> opt = otpRepository.findTopByMobileAndUsedOrderByExpiresAtDesc(mobile, false);
        if(opt.isEmpty()) return false;
        OtpCode otp = opt.get();
        if(otp.isUsed()) return false;
        if(otp.getExpiresAt().isBefore(Instant.now())) return false;
        if(!otp.getCode().equals(code)) return false;
        otp.setUsed(true);
        otpRepository.save(otp);
        return true;
    }
}
