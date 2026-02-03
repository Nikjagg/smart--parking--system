package com.smartparking.parking_backend.repository;

import com.smartparking.parking_backend.model.Booking;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    // Active bookings
    List<Booking> findByUserIdAndStatus(Long userId, String status);
    long countByStatus(String status);
    List<Booking> findByStatus(String status);
}
