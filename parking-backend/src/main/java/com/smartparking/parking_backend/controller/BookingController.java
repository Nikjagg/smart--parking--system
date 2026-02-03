package com.smartparking.parking_backend.controller;

import com.smartparking.parking_backend.model.Booking;
import com.smartparking.parking_backend.service.BookingService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // ================= CREATE BOOKING =================
    @PostMapping
    public ResponseEntity<?> createBooking(
            @RequestBody Booking booking,
            HttpServletRequest request
    ) {
        try {
            Long userId = (Long) request.getAttribute("userId");
            if (userId == null) {
                return ResponseEntity.status(401).body("Unauthorized");
            }

            booking.setUserId(userId);
            return ResponseEntity.ok(bookingService.createBooking(booking));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ================= ACTIVE BOOKINGS =================
    @GetMapping("/user")
    public ResponseEntity<?> getUserBookings(HttpServletRequest request) {

        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        return ResponseEntity.ok(
                bookingService.getBookingsByUser(userId)
        );
    }

    // ================= CANCELLED BOOKINGS =================
    @GetMapping("/user/cancelled")
    public ResponseEntity<?> getCancelledBookings(HttpServletRequest request) {

        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        return ResponseEntity.ok(
                bookingService.getCancelledBookings(userId)
        );
    }

    // ================= CANCEL BOOKING =================
    @PutMapping("/cancel/{id}")
    public ResponseEntity<?> cancelBooking(@PathVariable Long id) {
        return ResponseEntity.ok(bookingService.cancelBooking(id));
    }

    // ================= RECEIPT =================
    @GetMapping("/receipt/{id}")
    public ResponseEntity<String> downloadReceipt(@PathVariable Long id) {

        Booking booking = bookingService.getBookingById(id);

        return ResponseEntity.ok(
                "Receipt for Booking ID: " + booking.getId() +
                        "\nVehicle: " + booking.getVehicle() +
                        "\nSlot: P-" + booking.getSlotId() +
                        "\nTime: " + booking.getBookingTime() +
                        "\nPrice: " + booking.getPrice()
        );
    }
}
