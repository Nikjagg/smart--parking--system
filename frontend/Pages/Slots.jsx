import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getSlots } from "../services/api";

const INSTITUTES = ["CDAC", "IIT", "MIT"];

function Slots() {
  const [slots, setSlots] = useState([]);
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const navigate = useNavigate();

  // 🔹 FETCH SLOTS FROM BACKEND
  useEffect(() => {
    if (!selectedInstitute) return;

    getSlots(selectedInstitute)
      .then((res) => setSlots(res.data))
      .catch(() => alert("Failed to load slots"));
  }, [selectedInstitute]);

  // 🔹 SLOT CLICK
  const handleSlotClick = (slot) => {
    if (!slot.available) {
      alert("Slot already booked");
      return;
    }

    navigate(
      `/book/${slot.id}?institute=${slot.institute}&slotNumber=${slot.slotNumber}`
    );
  };

  return (
    <div style={styles.fullPage}>
      <div style={styles.contentWrapper}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.textContainer}
        >
          <h1 style={styles.mainTitle}>Parking Reservations</h1>
          <p style={styles.subTitle}>
            Select your destination to view real-time availability.
          </p>
        </motion.div>

        {/* SELECT */}
        <div style={styles.selectBox}>
          <select
            value={selectedInstitute}
            onChange={(e) => setSelectedInstitute(e.target.value)}
            style={styles.select}
          >
            <option value="">Choose Institute...</option>
            {INSTITUTES.map((inst) => (
              <option key={inst} value={inst}>{inst}</option>
            ))}
          </select>
          <div style={styles.selectDecorator} />
        </div>

        {/* GRID */}
        <div style={styles.slotContainer}>
          <AnimatePresence mode="wait">
            {selectedInstitute ? (
              <motion.div
                key={selectedInstitute}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                style={styles.grid}
              >
                {slots.map((slot, i) => (
                  <motion.div
                    key={slot.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={
                      slot.available
                        ? { scale: 1.05, borderColor: "#06b6d4" }
                        : {}
                    }
                    onClick={() => handleSlotClick(slot)}
                    style={{
                      ...styles.slotCard,
                      backgroundColor: slot.available ? "#164e63" : "#1e293b",
                      borderColor: slot.available ? "#0891b2" : "#334155",
                      cursor: slot.available ? "pointer" : "not-allowed",
                    }}
                  >
                    <div
                      style={{
                        ...styles.statusDot,
                        backgroundColor: slot.available ? "#22d3ee" : "#64748b",
                      }}
                    />
                    <span
                      style={{
                        ...styles.slotId,
                        color: slot.available ? "#cffafe" : "#94a3b8",
                      }}
                    >
                      {slot.id < 10 ? `P-0${slot.id}` : `P-${slot.id}`}
                    </span>
                    <span style={styles.slotStatus}>
                      {slot.available ? "VACANT" : "LOCKED"}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div style={styles.placeholder}>
                Please select an institute to view the parking map
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* 🔹 STYLES — ALWAYS OUTSIDE COMPONENT */
const styles = {
  fullPage: {
    minHeight: "100vh",
    backgroundColor: "#020617",
    color: "#f8fafc",
    paddingTop: "60px",
    display: "flex",
    justifyContent: "center"
  },
  contentWrapper: {
    width: "100%",
    maxWidth: "1000px",
    textAlign: "center"
  },
  textContainer: { marginBottom: "40px" },
  mainTitle: { fontSize: "42px", fontWeight: "800" },
  subTitle: { color: "#94a3b8" },
  selectBox: { marginBottom: "40px" },
  select: { padding: "14px", borderRadius: "12px" },
  selectDecorator: { height: "2px" },
  slotContainer: { minHeight: "300px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px,1fr))", gap: "20px" },
  slotCard: { padding: "25px", borderRadius: "20px", border: "1px solid" },
  statusDot: { width: "8px", height: "8px", borderRadius: "50%" },
  slotId: { fontSize: "20px", fontWeight: "700" },
  slotStatus: { fontSize: "10px", letterSpacing: "2px" },
  placeholder: { color: "#475569", marginTop: "80px" }
};

export default Slots;
