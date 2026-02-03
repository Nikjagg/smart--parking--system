package com.smartparking.parking_backend.service;

import com.smartparking.parking_backend.model.Booking;
import com.smartparking.parking_backend.model.Slot;
import com.smartparking.parking_backend.repository.BookingRepository;
import com.smartparking.parking_backend.repository.SlotRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import jakarta.transaction.Transactional;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final SlotRepository slotRepository;
    private final EmailService emailService;

    public BookingService(
            BookingRepository bookingRepository,
            SlotRepository slotRepository,
            EmailService emailService
    ) {
        this.bookingRepository = bookingRepository;
        this.slotRepository = slotRepository;
        this.emailService = emailService;
    }

    // ================= CREATE BOOKING =================
    @Transactional
    public Booking createBooking(Booking booking) {

        // ✅ HARD VALIDATION (email null issue fixed)
        if (booking.getUserEmail() == null || booking.getUserEmail().trim().isEmpty()) {
            throw new RuntimeException("User email is required");
        }

        if (booking.getUserName() == null || booking.getUserName().trim().isEmpty()) {
            throw new RuntimeException("User name is required");
        }

        Slot slot = slotRepository.findById(booking.getSlotId())
                .orElseThrow(() -> new RuntimeException("Slot not found"));

        if (!slot.isAvailable()) {
            throw new RuntimeException("Slot already booked");
        }

        // 🔒 lock slot
        slot.setAvailable(false);
        slotRepository.save(slot);

        // 🕒 booking metadata
        booking.setBookingTime(LocalDateTime.now());
        booking.setStatus("ACTIVE");
        booking.setWarningSent(false);

        // ⏳ EXPIRY TIME CALCULATION (string duration supported)
        int minutes = 60; // default

        if (booking.getDuration() != null) {
            switch (booking.getDuration()) {
                case "30 MIN":
                    minutes = 30;
                    break;
                case "1 HOUR":
                    minutes = 60;
                    break;
                case "2 HOURS":
                    minutes = 120;
                    break;
                default:
                    minutes = 60;
            }
        }

        booking.setExpiryTime(
                booking.getBookingTime().plusMinutes(minutes)
        );

        Booking savedBooking = bookingRepository.save(booking);

        // 📧 confirmation email (NON-BLOCKING)
        try {
            emailService.sendBookingConfirmation(
                    savedBooking.getUserEmail(),
                    savedBooking.getUserName(),
                    slot.getId(),
                    slot.getInstitute(),
                    savedBooking.getExpiryTime().toString()
            );
        } catch (Exception e) {
            System.out.println("Email error: " + e.getMessage());
        }

        return savedBooking;
    }

    // ================= GET ACTIVE BOOKINGS =================
    public List<Booking> getBookingsByUser(Long userId) {
        return bookingRepository.findByUserIdAndStatus(userId, "ACTIVE");
    }

    // ================= GET CANCELLED BOOKINGS =================
    public List<Booking> getCancelledBookings(Long userId) {
        return bookingRepository.findByUserIdAndStatus(userId, "CANCELLED");
    }

    // ================= CANCEL BOOKING =================
    @Transactional
    public Booking cancelBooking(Long id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // already cancelled → safe return
        if ("CANCELLED".equals(booking.getStatus())) {
            return booking;
        }

        booking.setStatus("CANCELLED");
        booking.setCancelledAt(LocalDateTime.now());

        // 🔓 free slot
        Slot slot = slotRepository.findById(booking.getSlotId())
                .orElseThrow(() -> new RuntimeException("Slot not found"));

        slot.setAvailable(true);
        slotRepository.save(slot);

        Booking savedBooking = bookingRepository.save(booking);

        // 📧 cancellation email (safe)
        try {
            if (savedBooking.getUserEmail() != null) {
                emailService.sendBookingCancellation(
                        savedBooking.getUserEmail(),
                        savedBooking.getUserName(),
                        slot.getId()
                );
            }
        } catch (Exception e) {
            System.out.println("Cancel email failed: " + e.getMessage());
        }

        return savedBooking;
    }

    // ================= GET BOOKING BY ID =================
    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }
}
