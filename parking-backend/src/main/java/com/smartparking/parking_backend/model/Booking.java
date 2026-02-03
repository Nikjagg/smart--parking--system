package com.smartparking.parking_backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")


public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ================= BASIC FIELDS =================
    private Long userId;
    private Long slotId;

    private String name;
    private String vehicle;

    // arrival time from frontend (HH:mm)
    private String time;

    private String institute;

    // e.g. "30", "60", "120" (minutes)
    private String duration;

    private String price;

    // ================= EMAIL FIELDS =================
    @Column(nullable = false)
    private String userEmail;

    @Column(nullable = false)
    private String userName;

    // ================= STATUS =================
    private String status; // ACTIVE / CANCELLED / EXPIRED

    // ================= TIME FIELDS =================
    private LocalDateTime bookingTime;
    private LocalDateTime cancelledAt;

    // 🔥 NEW — auto expiry time
    private LocalDateTime expiryTime;
    
    private boolean warningSent = false;


    // ================= CONSTRUCTORS =================
    public Booking() {}

    // ================= GETTERS & SETTERS =================
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getSlotId() { return slotId; }
    public void setSlotId(Long slotId) { this.slotId = slotId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getVehicle() { return vehicle; }
    public void setVehicle(String vehicle) { this.vehicle = vehicle; }

    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }

    public String getInstitute() { return institute; }
    public void setInstitute(String institute) { this.institute = institute; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getPrice() { return price; }
    public void setPrice(String price) { this.price = price; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getBookingTime() { return bookingTime; }
    public void setBookingTime(LocalDateTime bookingTime) { this.bookingTime = bookingTime; }

    public LocalDateTime getCancelledAt() { return cancelledAt; }
    public void setCancelledAt(LocalDateTime cancelledAt) { this.cancelledAt = cancelledAt; }

    public LocalDateTime getExpiryTime() { return expiryTime; }
    public void setExpiryTime(LocalDateTime expiryTime) { this.expiryTime = expiryTime; }
    
    public boolean isWarningSent() {
        return warningSent;
    }

    public void setWarningSent(boolean warningSent) {
        this.warningSent = warningSent;
    }

    // ================= AUTO SET VALUES =================
    @PrePersist
    public void prePersist() {

        // booking time
        if (this.bookingTime == null) {
            this.bookingTime = LocalDateTime.now();
        }

        // default status
        if (this.status == null) {
            this.status = "ACTIVE";
        }

        // 🔥 auto expiry calculation (based on duration)
        if (this.expiryTime == null && this.duration != null) {
            try {
                int minutes = Integer.parseInt(this.duration);
                this.expiryTime = this.bookingTime.plusMinutes(minutes);
            } catch (NumberFormatException e) {
                // fallback 60 min
                this.expiryTime = this.bookingTime.plusMinutes(60);
            }
        }
    }
}
