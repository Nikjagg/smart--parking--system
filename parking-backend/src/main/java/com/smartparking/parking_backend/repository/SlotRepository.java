package com.smartparking.parking_backend.repository;

import com.smartparking.parking_backend.model.Slot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SlotRepository extends JpaRepository<Slot, Long> {

    List<Slot> findByInstitute(String institute);
}
