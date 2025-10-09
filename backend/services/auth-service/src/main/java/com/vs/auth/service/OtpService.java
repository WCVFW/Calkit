package com.vs.auth.service;

import com.vs.auth.model.OtpCode;
import com.vs.auth.repo.OtpRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.Random;

@Service
public class OtpService {

    private final OtpRepository otpRepository;
    private final Random random = new Random();

    public OtpService(OtpRepository otpRepository){
        this.otpRepository = otpRepository;
    }

    public String generateAndSave(String mobile){
        String code = String.format("%06d", random.nextInt(1_000_000));
        Instant expires = Instant.now().plus(5, ChronoUnit.MINUTES);
        OtpCode otp = new OtpCode(mobile, code, expires);
        otpRepository.save(otp);
        // Simulate send via SMS — in real system integrate provider
        System.out.println("[OTP SEND] mobile=" + mobile + " code=" + code);
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
