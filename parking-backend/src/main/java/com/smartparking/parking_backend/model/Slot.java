package com.smartparking.parking_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "slots")
public class Slot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String institute;
    private int slotNumber;
    private boolean available = true;

    // ✅ REQUIRED by JPA
    public Slot() {}

    // ✅ THIS CONSTRUCTOR WAS MISSING (MAIN FIX)
    public Slot(String institute, int slotNumber, boolean available) {
        this.institute = institute;
        this.slotNumber = slotNumber;
        this.available = available;
    }

    // Getters & Setters
    public Long getId() { return id; }

    public String getInstitute() { return institute; }
    public void setInstitute(String institute) { this.institute = institute; }

    public int getSlotNumber() { return slotNumber; }
    public void setSlotNumber(int slotNumber) { this.slotNumber = slotNumber; }

    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }
}
