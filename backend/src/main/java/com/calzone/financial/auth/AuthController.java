package com.calzone.financial.auth;

import com.calzone.financial.auth.dto.AuthResponse;
import com.calzone.financial.auth.dto.LoginRequest;
import com.calzone.financial.auth.dto.RegisterRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final com.calzone.financial.email.EmailVerificationService emailVerificationService;

    public AuthController(AuthService authService, com.calzone.financial.email.EmailVerificationService emailVerificationService) {
        this.authService = authService;
        this.emailVerificationService = emailVerificationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse res = authService.register(request);
        try {
            emailVerificationService.sendCode(request.email());
        } catch (Exception ignored) {}
        return ResponseEntity.ok(res);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    public record EmailReq(@jakarta.validation.constraints.Email String email) {}
    public record VerifyReq(@jakarta.validation.constraints.Email String email, @jakarta.validation.constraints.NotBlank String code) {}

    @PostMapping("/request-email-otp")
    public ResponseEntity<?> requestEmailOtp(@Valid @RequestBody EmailReq req) {
        emailVerificationService.sendCode(req.email());
        return ResponseEntity.ok(java.util.Map.of("message", "OTP sent"));
    }

    @PostMapping("/verify-email")
    public ResponseEntity<?> verifyEmail(@Valid @RequestBody VerifyReq req) {
        emailVerificationService.verifyCode(req.email(), req.code());
        return ResponseEntity.ok(java.util.Map.of("message", "Email verified"));
    }
}
