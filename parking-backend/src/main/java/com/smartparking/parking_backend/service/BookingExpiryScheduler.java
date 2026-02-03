package com.smartparking.parking_backend.service;

import com.smartparking.parking_backend.model.Booking;
import com.smartparking.parking_backend.model.Slot;
import com.smartparking.parking_backend.repository.BookingRepository;
import com.smartparking.parking_backend.repository.SlotRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingExpiryScheduler {

    private final BookingRepository bookingRepository;
    private final SlotRepository slotRepository;
    private final EmailService emailService;

    public BookingExpiryScheduler(
            BookingRepository bookingRepository,
            SlotRepository slotRepository,
            EmailService emailService
    ) {
        this.bookingRepository = bookingRepository;
        this.slotRepository = slotRepository;
        this.emailService = emailService;
    }

    // 🔁 runs every 1 minute
    @Scheduled(fixedRate = 60000)
    public void checkExpiry() {

        List<Booking> activeBookings =
                bookingRepository.findByStatus("ACTIVE");

        LocalDateTime now = LocalDateTime.now();

        for (Booking booking : activeBookings) {

            // 🛑 NULL SAFETY (VERY IMPORTANT)
            if (booking.getExpiryTime() == null) {
                continue;
            }

            // ⚠ 10 minute warning
            if (!booking.isWarningSent()
                    && booking.getExpiryTime().minusMinutes(10).isBefore(now)) {

                emailService.sendExpiryWarning(
                        booking.getUserEmail(),
                        booking.getUserName(),
                        booking.getSlotId()
                );

                booking.setWarningSent(true);
                bookingRepository.save(booking);
            }

            // ⏰ expired
            if (booking.getExpiryTime().isBefore(now)) {

                booking.setStatus("EXPIRED");

                Slot slot = slotRepository
                        .findById(booking.getSlotId())
                        .orElse(null);

                if (slot != null) {
                    slot.setAvailable(true);
                    slotRepository.save(slot);
                }

                bookingRepository.save(booking);

                emailService.sendExpiryConfirmation(
                        booking.getUserEmail(),
                        booking.getUserName(),
                        booking.getSlotId()
                );
            }
        }
    }
}
