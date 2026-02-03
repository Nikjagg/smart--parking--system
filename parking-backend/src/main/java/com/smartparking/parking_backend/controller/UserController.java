package com.smartparking.parking_backend.controller;

import com.smartparking.parking_backend.model.User;
import com.smartparking.parking_backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ✅ GET USER BY ID (PROFILE)
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    // ✅ UPDATE PROFILE
    @PutMapping("/{id}")
    public ResponseEntity<User> updateProfile(
            @PathVariable Long id,
            @RequestBody User user
    ) {
        return ResponseEntity.ok(userService.updateProfile(id, user));
    }

    // ✅ REGISTER
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        return ResponseEntity.ok(userService.register(user));
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User loginRequest) {

        User user = userService.login(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );

        if (user == null) {
            return ResponseEntity.badRequest()
                    .body(null);
        }

        return ResponseEntity.ok(user);
    }
}
