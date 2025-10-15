package com.vs.crm.service.impl;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.vs.crm.service.OtpService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class OtpServiceImpl implements OtpService {

    private final JavaMailSender mailSender;

    public OtpServiceImpl(JavaMailSender mailSender,
                          @Value("${twilio.accountSid:}") String sid,
                          @Value("${twilio.authToken:}") String token) {
        this.mailSender = mailSender;
        if (!sid.isBlank() && !token.isBlank()) {
            Twilio.init(sid, token);
        }
    }

    @Value("${twilio.fromPhone:}")
    private String twilioFrom;

    @Value("${spring.mail.username:}")
    private String mailFrom;

    @Override
    public void sendSmsOtp(String toPhone, String code) {
        if (twilioFrom == null || twilioFrom.isBlank()) return;
        Message.creator(new com.twilio.type.PhoneNumber(toPhone), new com.twilio.type.PhoneNumber(twilioFrom),
                "Your OTP is: " + code + "\nValid for 10 minutes.").create();
    }

    @Override
    public void sendEmailOtp(String toEmail, String code) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(mailFrom);
        msg.setTo(toEmail);
        msg.setSubject("Your OTP Code");
        msg.setText("Your OTP is: " + code + "\nValid for 10 minutes.");
        mailSender.send(msg);
    }
}
