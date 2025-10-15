package com.vs.crm.controller;

import com.vs.crm.model.Role;
import com.vs.crm.model.User;
import com.vs.crm.repo.RoleRepository;
import com.vs.crm.repo.UserRepository;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final UserRepository users;
    private final RoleRepository roles;
    private final PasswordEncoder encoder;

    public AdminController(UserRepository users, RoleRepository roles, PasswordEncoder encoder) {
        this.users = users; this.roles = roles; this.encoder = encoder;
    }

    public record CreateEmployee(@Email String email, @NotBlank String phone, @NotBlank String password) {}

    @PostMapping("/employees")
    public ResponseEntity<?> createEmployee(@RequestBody CreateEmployee req) {
        User u = new User();
        u.setEmail(req.email());
        u.setPhone(req.phone());
        u.setPasswordHash(encoder.encode(req.password()));
        Role role = roles.findByName("EMPLOYEE").orElseGet(() -> roles.save(new Role("EMPLOYEE")));
        u.getRoles().add(role);
        users.save(u);
        return ResponseEntity.ok(Map.of("id", u.getId()));
    }

    @GetMapping("/employees")
    public List<User> listEmployees() {
        Role emp = roles.findByName("EMPLOYEE").orElse(null);
        if (emp == null) return List.of();
        return users.findAll().stream().filter(u -> u.getRoles().stream().anyMatch(r -> r.getName().equals("EMPLOYEE"))).toList();
    }
}
