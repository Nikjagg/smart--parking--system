
package com.smartparking.parking_backend.service;
import com.smartparking.parking_backend.model.User;
import com.smartparking.parking_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(User user) {
        if (userRepository.existsByEmail(user.getEmail().trim())) {
            throw new RuntimeException("Email already exists");
        }
        return userRepository.save(user);
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email.trim());
        if (user == null) throw new RuntimeException("User not found");
        if (!user.getPassword().trim().equals(password.trim())) 
            throw new RuntimeException("Invalid password");
        return user;
    }
}
