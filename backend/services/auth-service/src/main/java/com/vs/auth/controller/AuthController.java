package com.vs.auth.controller;

import com.vs.auth.dto.AuthDtos;
import com.vs.auth.model.User;
import com.vs.auth.service.JwtService;
import com.vs.auth.service.OtpService;
import com.vs.auth.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final OtpService otpService;
    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(OtpService otpService, UserService userService, JwtService jwtService){
        this.otpService = otpService;
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody AuthDtos.SendOtpRequest req){
        if(req == null || req.getMobile() == null || req.getMobile().trim().isEmpty()){
            return ResponseEntity.badRequest().body(Map.of("error","mobile_required"));
        }
        try{
            String code = otpService.generateAndSave(req.getMobile().trim());
            return ResponseEntity.ok(Map.of("sent", true));
        }catch(IllegalStateException e){
            return ResponseEntity.status(429).body(Map.of("error","rate_limited"));
        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error","send_failed"));
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody AuthDtos.VerifyOtpRequest req){
        if(req == null || req.getMobile() == null || req.getCode() == null)
            return ResponseEntity.badRequest().body(Map.of("error","invalid_payload"));
        boolean ok = otpService.verify(req.getMobile().trim(), req.getCode().trim());
        if(!ok) return ResponseEntity.status(401).body(Map.of("error","invalid_otp"));
        User u = userService.findOrCreateByMobile(req.getMobile().trim());
        String token = jwtService.generateToken(u.getMobile());
        AuthDtos.AuthResponse resp = new AuthDtos.AuthResponse(token, u.getMobile(), u.getName());
        return ResponseEntity.ok(resp);
    }
}
