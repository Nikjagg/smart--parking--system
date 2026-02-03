
package com.smartparking.parking_backend.service;

import com.smartparking.parking_backend.model.Admin;
import com.smartparking.parking_backend.repository.AdminRepository;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    // ✅ REGISTER
    public Admin register(Admin admin) {

        // email duplicate check
        adminRepository.findByEmail(admin.getEmail())
                .ifPresent(a -> {
                    throw new RuntimeException("Admin already exists");
                });

        // role force set
        admin.setRole("ADMIN");

        return adminRepository.save(admin);
    }

    // ✅ LOGIN
    public Admin login(String email, String password) {

        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (!admin.getPassword().equals(password)) {
            throw new RuntimeException("Invalid credentials");
        }

        return admin;
    }
}

