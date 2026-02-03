package com.smartparking.parking_backend.controller;

import com.smartparking.parking_backend.model.Slot;
import com.smartparking.parking_backend.service.SlotService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/slots")
@CrossOrigin(origins = "http://localhost:3000")
public class SlotController {

    private final SlotService slotService;

    public SlotController(SlotService slotService) {
        this.slotService = slotService;
    }

    @GetMapping
    public List<Slot> getAllSlots(@RequestParam(required = false) String institute) {
        if (institute != null) {
            return slotService.getSlotsByInstitute(institute);
        }
        return slotService.getAllSlots();
    }

    @PutMapping("/{id}")
    public Slot updateSlot(@PathVariable Long id, @RequestBody Slot slot) {
        return slotService.updateSlot(id, slot.isAvailable());
    }
    
    
    
}