package com.smartparking.parking_backend.controller;

import com.smartparking.parking_backend.model.User;
import com.smartparking.parking_backend.security.JwtService;
import com.smartparking.parking_backend.service.AuthService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    public AuthController(AuthService authService,
                          JwtService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody User user) {

        User savedUser = authService.register(user);
        String token = jwtService.generateToken(
                savedUser.getId(),
                savedUser.getEmail()
        );

        Map<String, Object> res = new HashMap<>();
        res.put("user", savedUser);
        res.put("token", token);
        return res;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User user) {

        User loggedUser =
                authService.login(user.getEmail(), user.getPassword());

        String token = jwtService.generateToken(
                loggedUser.getId(),
                loggedUser.getEmail()
        );

        Map<String, Object> res = new HashMap<>();
        res.put("user", loggedUser);
        res.put("token", token);
        return res;
    }
}
