package com.smartparking.parking_backend.service;

import com.smartparking.parking_backend.model.Slot;
import com.smartparking.parking_backend.repository.SlotRepository;
import org.springframework.stereotype.Service;
import java.util.List;

import jakarta.annotation.PostConstruct;

@Service
public class SlotService {

    private final SlotRepository slotRepository;

    public SlotService(SlotRepository slotRepository) {
        this.slotRepository = slotRepository;
    }

    public List<Slot> getSlotsByInstitute(String institute) {
        return slotRepository.findByInstitute(institute);
    }

    public List<Slot> getAllSlots() {
        return slotRepository.findAll();
    }

    public Slot updateSlot(Long id, boolean available) {
        Slot slot = slotRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Slot not found"));
        slot.setAvailable(available);
        return slotRepository.save(slot);
    }

    // Seed initial slots if none exist
    @PostConstruct
    public void seedSlots() {
        if(slotRepository.count() == 0) {
            String[] institutes = {"CDAC", "IIT", "MIT"};
            for(String inst : institutes) {
                for(int i = 1; i <= 12; i++) {
                    Slot slot = new Slot(inst, i, true); // all slots available
                    slotRepository.save(slot);
                }
            }
        }
    }
}
