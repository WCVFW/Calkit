package com.vs.auth.controller;

import com.vs.auth.model.User;
import com.vs.auth.repo.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication auth){
        if(auth == null) return ResponseEntity.status(401).body(Map.of("error","unauthenticated"));
        String mobile = auth.getName();
        Optional<com.vs.auth.model.User> u = userRepository.findByMobile(mobile);
        if(u.isEmpty()) return ResponseEntity.status(404).body(Map.of("error","not_found"));
        User user = u.get();
        return ResponseEntity.ok(Map.of("id", user.getId(), "mobile", user.getMobile(), "name", user.getName()));
    }
}
