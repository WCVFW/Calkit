package com.calzone.financial.auth;

import com.calzone.financial.auth.dto.AuthResponse;
import com.calzone.financial.auth.dto.LoginRequest;
import com.calzone.financial.auth.dto.RegisterRequest;
import com.calzone.financial.auth.dto.UserProfile;
import com.calzone.financial.user.User;
import com.calzone.financial.user.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already registered");
        }

        User user = User.builder()
                .fullName(request.fullName().trim())
                .email(request.email().trim().toLowerCase())
                .phone(request.phone().trim())
                .password(passwordEncoder.encode(request.password()))
                .build();

        User saved = userRepository.save(user);
        String token = jwtService.generateToken(saved);
        return new AuthResponse(token, toProfile(saved));
    }

    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );

        Object principal = authentication.getPrincipal();
        if (!(principal instanceof User user)) {
            throw new UsernameNotFoundException("Invalid credentials");
        }
        String token = jwtService.generateToken(user);
        return new AuthResponse(token, toProfile(user));
    }

    private UserProfile toProfile(User user) {
        return new UserProfile(user.getId(), user.getFullName(), user.getEmail(), user.getPhone());
    }
}
