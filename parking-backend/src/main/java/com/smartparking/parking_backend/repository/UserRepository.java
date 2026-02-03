package com.smartparking.parking_backend.repository;

import com.smartparking.parking_backend.model.User;



import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
	User findByEmail(String email); // For login
    boolean existsByEmail(String email);
}