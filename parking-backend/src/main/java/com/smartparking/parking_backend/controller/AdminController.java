package com.smartparking.parking_backend.controller;


import com.smartparking.parking_backend.model.Admin;
import com.smartparking.parking_backend.model.User;
import com.smartparking.parking_backend.security.JwtService;
import com.smartparking.parking_backend.service.AdminService;
import com.smartparking.parking_backend.service.AuthService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    private final AuthService authService;
    private final JwtService jwtService;

    public AdminController(AuthService authService, JwtService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody User user) {
        User savedUser = authService.register(user);
        String token = jwtService.generateToken(savedUser.getId(), savedUser.getEmail());

        Map<String, Object> res = new HashMap<>();
        res.put("user", savedUser);
        res.put("token", token);
        return res;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User user) {
        User loggedUser = authService.login(user.getEmail(), user.getPassword());
        String token = jwtService.generateToken(loggedUser.getId(), loggedUser.getEmail());

        Map<String, Object> res = new HashMap<>();
        res.put("user", loggedUser);
        res.put("token", token);
        return res;
    }
}
