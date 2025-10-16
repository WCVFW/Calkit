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

    /**
     * Endpoint for user registration. Registers the user and sends an email verification code.
     */
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse res = authService.register(request);
        // The original logic had a try/catch around sending the code. Retaining this structure.
        try {
            emailVerificationService.sendCode(request.email());
        } catch (Exception ignored) {
            // Log the error but don't fail the registration if email fails (often handled separately in production)
            System.err.println("Warning: Failed to send verification email after successful registration.");
        }
        return ResponseEntity.ok(res);
    }

    /**
     * Endpoint for user login using email and password.
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    /**
     * Request DTO for email-based requests (e.g., OTP request).
     */
    public record EmailReq(@jakarta.validation.constraints.Email String email) {}

    /**
     * Request DTO for verification requests (email and OTP code).
     */
    public record VerifyReq(@jakarta.validation.constraints.Email String email, @jakarta.validation.constraints.NotBlank String code) {}

    /**
     * Initiates the OTP process by sending a code to the user's email.
     */
    @PostMapping("/request-email-otp")
    public ResponseEntity<?> requestEmailOtp(@Valid @RequestBody EmailReq req) {
        emailVerificationService.sendCode(req.email());
        return ResponseEntity.ok(java.util.Map.of("message", "OTP sent"));
    }

    /**
     * Verifies the OTP code provided by the user.
     */
    @PostMapping("/verify-email")
    public ResponseEntity<?> verifyEmail(@Valid @RequestBody VerifyReq req) {
        emailVerificationService.verifyCode(req.email(), req.code());
        return ResponseEntity.ok(java.util.Map.of("message", "Email verified"));
    }
}
