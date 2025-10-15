package com.vs.crm.service;

public interface OtpService {
    void sendSmsOtp(String toPhone, String code);
    void sendEmailOtp(String toEmail, String code);
}
