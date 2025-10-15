package com.vs.crm.controller;

import com.vs.crm.model.Role;
import com.vs.crm.model.User;
import com.vs.crm.repo.RoleRepository;
import com.vs.crm.repo.UserRepository;
import com.vs.crm.security.JwtService;
import com.vs.crm.service.OtpService;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository users;
    private final RoleRepository roles;
    private final PasswordEncoder encoder;
    private final JwtService jwt;
    private final OtpService otpService;

    public AuthController(UserRepository users, RoleRepository roles, PasswordEncoder encoder, JwtService jwt, OtpService otpService) {
        this.users = users; this.roles = roles; this.encoder = encoder; this.jwt = jwt; this.otpService = otpService;
    }

    public record RegisterRequest(@Email String email, @NotBlank String phone, @NotBlank String password, String role) {}

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {
        User u = new User();
        u.setEmail(req.email());
        u.setPhone(req.phone());
        u.setPasswordHash(encoder.encode(req.password()));
        String roleName = (req.role() == null || req.role().isBlank()) ? "CUSTOMER" : req.role().toUpperCase();
        Role role = roles.findByName(roleName).orElseGet(() -> roles.save(new Role(roleName)));
        u.getRoles().add(role);
        users.save(u);
        return ResponseEntity.ok(Map.of("id", u.getId()));
    }

    public record LoginRequest(@Email String email, @NotBlank String password) {}

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        User u = users.findByEmail(req.email()).orElse(null);
        if (u == null || !encoder.matches(req.password(), u.getPasswordHash())) {
            return ResponseEntity.status(401).body(Map.of("error", "invalid_credentials"));
        }
        var rolesList = u.getRoles().stream().map(Role::getName).toList();
        String token = jwt.generateToken(u.getEmail(), rolesList);
        return ResponseEntity.ok(Map.of("token", token, "roles", rolesList));
    }

    public record OtpRequest(@Email String email, String phone) {}

    @PostMapping("/otp/request")
    public ResponseEntity<?> requestOtp(@RequestBody OtpRequest req) {
        User u = (req.email()!=null) ? users.findByEmail(req.email()).orElse(null) : users.findByPhone(req.phone()).orElse(null);
        if (u == null) return ResponseEntity.status(404).body(Map.of("error","user_not_found"));
        String code = String.format("%06d", new Random().nextInt(1_000_000));
        u.setOtpCode(code);
        u.setOtpExpiresAt(Instant.now().plus(10, ChronoUnit.MINUTES));
        users.save(u);
        if (req.phone()!=null && !req.phone().isBlank()) otpService.sendSmsOtp(req.phone(), code);
        if (req.email()!=null && !req.email().isBlank()) otpService.sendEmailOtp(req.email(), code);
        return ResponseEntity.ok(Map.of("status","sent"));
    }

    public record OtpVerify(@Email String email, String phone, String code) {}

    @PostMapping("/otp/verify")
    public ResponseEntity<?> verifyOtp(@RequestBody OtpVerify req) {
        User u = (req.email()!=null) ? users.findByEmail(req.email()).orElse(null) : users.findByPhone(req.phone()).orElse(null);
        if (u == null) return ResponseEntity.status(404).body(Map.of("error","user_not_found"));
        if (u.getOtpCode()==null || u.getOtpExpiresAt()==null || u.getOtpExpiresAt().isBefore(Instant.now()) || !u.getOtpCode().equals(req.code())) {
            return ResponseEntity.status(400).body(Map.of("error","invalid_otp"));
        }
        if (req.email()!=null) u.setEmailVerified(true); else u.setPhoneVerified(true);
        u.setOtpCode(null); u.setOtpExpiresAt(null);
        users.save(u);
        return ResponseEntity.ok(Map.of("status","verified"));
    }
}
