package com.smartparking.parking_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    // ================= BOOKING CONFIRMATION =================
    public void sendBookingConfirmation(
            String toEmail,
            String userName,
            Long slotId,
            String institute,
            String time
    ) {
        if (toEmail == null || toEmail.isBlank()) return;

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setFrom("smartparking@gmail.com");
            message.setSubject("Parking Slot Booked Successfully");

            message.setText(
                "Hello " + userName + ",\n\n" +
                "Institute: " + institute + "\n" +
                "Slot ID: " + slotId + "\n" +
                "Valid Till: " + time + "\n\n" +
                "Smart Parking Team"
            );

            mailSender.send(message);
        } catch (Exception e) {
            System.out.println("Email error (booking): " + e.getMessage());
        }
    }

    // ================= EXPIRY WARNING =================
    public void sendExpiryWarning(
            String toEmail,
            String userName,
            Long slotId
    ) {
        if (toEmail == null || toEmail.isBlank()) return;

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setFrom("smartparking@gmail.com");
            message.setSubject("⏰ Parking Slot Expiry Warning");

            message.setText(
                "Hello " + userName + ",\n\n" +
                "Your parking slot (P-" + slotId + ") will expire in 10 minutes.\n" +
                "Please reach the parking or extend your booking.\n\n" +
                "Smart Parking Team"
            );

            mailSender.send(message);
        } catch (Exception e) {
            System.out.println("Email error (warning): " + e.getMessage());
        }
    }

    // ================= CANCELLATION =================
    public void sendBookingCancellation(
            String toEmail,
            String userName,
            Long slotId
    ) {
        if (toEmail == null || toEmail.isBlank()) return;

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setFrom("smartparking@gmail.com");
            message.setSubject("Parking Slot Cancelled");

            message.setText(
                "Hello " + userName + ",\n\n" +
                "Your parking slot (P-" + slotId + ") has been cancelled.\n\n" +
                "Smart Parking Team"
            );

            mailSender.send(message);
        } catch (Exception e) {
            System.out.println("Email error (cancel): " + e.getMessage());
        }
    }

    // ================= EXPIRY CONFIRMATION =================
    public void sendExpiryConfirmation(
            String toEmail,
            String userName,
            Long slotId
    ) {
        if (toEmail == null || toEmail.isBlank()) return;

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setFrom("smartparking@gmail.com");
            message.setSubject("⌛ Parking Slot Expired");

            message.setText(
                "Hello " + userName + ",\n\n" +
                "Your parking slot (P-" + slotId + ") has expired.\n" +
                "The slot is now released.\n\n" +
                "Smart Parking Team"
            );

            mailSender.send(message);
        } catch (Exception e) {
            System.out.println("Email error (expired): " + e.getMessage());
        }
    }
}
