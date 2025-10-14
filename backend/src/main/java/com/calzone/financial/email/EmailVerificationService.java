package com.calzone.financial.email;

import com.calzone.financial.user.UserRepository;
import jakarta.validation.constraints.Email;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;

@Service
public class EmailVerificationService {

    private static final Duration TTL = Duration.ofMinutes(10);
    private static final SecureRandom RNG = new SecureRandom();

    private final VerificationCodeRepository repo;
    private final JavaMailSender mailSender;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${spring.mail.username:}")
    private String fromEmail;

    public EmailVerificationService(VerificationCodeRepository repo, JavaMailSender mailSender, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.repo = repo;
        this.mailSender = mailSender;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public void sendCode(@Email String email) {
        String code = generateCode(6);
        Instant now = Instant.now();
        repo.purgeByEmailOrExpired(email.toLowerCase(), now);
        VerificationCode vc = new VerificationCode();
        vc.setEmail(email.toLowerCase());
        vc.setCodeHash(passwordEncoder.encode(code));
        vc.setExpiresAt(now.plus(TTL));
        vc.setUsed(false);
        vc.setAttempts(0);
        vc.setMaxAttempts(5);
        repo.save(vc);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        if (fromEmail != null && !fromEmail.isBlank()) {
            message.setFrom(fromEmail);
        }
        message.setSubject("Verify your email");
        message.setText("Your verification code is: " + code + "\nThis code expires in " + TTL.toMinutes() + " minutes.");
        try {
            mailSender.send(message);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to send email: " + e.getMessage());
        }
    }

    @Transactional
    public void verifyCode(@Email String email, String code) {
        VerificationCode latest = repo.findActiveLatest(email.toLowerCase(), Instant.now())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "OTP expired or not found"));

        if (latest.isUsed() || latest.getAttempts() >= latest.getMaxAttempts()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "OTP expired or not found");
        }

        boolean match = passwordEncoder.matches(code, latest.getCodeHash());
        if (!match) {
            latest.setAttempts(latest.getAttempts() + 1);
            repo.save(latest);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid code");
        }

        latest.setUsed(true);
        repo.save(latest);

        userRepository.findByEmail(email.toLowerCase()).ifPresent(u -> {
            if (u.getEmailVerified() == null || !u.getEmailVerified()) {
                u.setEmailVerified(true);
                userRepository.save(u);
            }
        });
    }

    private static String generateCode(int length) {
        int min = (int) Math.pow(10, length - 1);
        int max = (int) Math.pow(10, length) - 1;
        int n = RNG.nextInt(max - min + 1) + min;
        return Integer.toString(n);
    }
}
