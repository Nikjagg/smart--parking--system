import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { createBooking } from "../services/api";

function BookSlot() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const institute = searchParams.get("institute") || "General";

  // ✅ duration in minutes (backend friendly)
  const [duration] = useState(60); // default 1 hour

  const [name, setName] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [time, setTime] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || !vehicle || !time) {
      alert("Please fill all fields!");
      return;
    }

    // ✅ EMAIL SAFETY CHECK
    if (!user || !user.email) {
      alert("User email missing. Please login again.");
      return;
    }

    try {
      await createBooking({
  slotId: parseInt(id),
  userId: user.id,

  name: name,                 // ✅ backend match
  userName: name,             // (email ke liye)
  userEmail: user.email,

  vehicle: vehicle,           // ✅ backend match
  time: time,                 // ✅ backend match
  institute: institute,
  duration: duration.toString()
});


      // ✅ Save booking info locally
      const bookingData = { id, name, vehicle, time };
      localStorage.setItem("lastBooking", JSON.stringify(bookingData));

      navigate("/booking-success", { state: bookingData });
      alert("Booking successful!");
    } catch (error) {
      alert(
        (error.response && error.response.data.message) ||
          "Slot already booked"
      );
    }
  }

  // UI badge label (no style change)
  const durationLabel = "1 Hour";

  return (
    <div style={styles.fullPage}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={styles.card}
      >
        <div style={styles.headerSection}>
          <div style={styles.glowCircle}>🎫</div>
          <h2 style={styles.title}>Finalize Booking</h2>
          <p style={styles.subtitle}>
            Parking at <span style={styles.highlight}>{institute}</span> | Slot:{" "}
            <span style={styles.highlight}>P-{id}</span>
          </p>
          <div style={styles.badge}>{durationLabel} Plan</div>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Vehicle Number</label>
            <input
              type="text"
              placeholder="e.g. MH12AB1234"
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Expected Arrival</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={styles.input}
              onClick={(e) => e.target.showPicker && e.target.showPicker()}
            />
          </div>

          <div style={styles.priceRow}>
            <span>Total Payable:</span>
            <span style={{ color: "#facc15", fontWeight: "bold" }}>₹100</span>
          </div>

          <button type="submit" style={styles.button}>
            Confirm & Pay
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            style={styles.cancelLink}
          >
            Go Back
          </button>
        </form>
      </motion.div>
    </div>
  );
}

/* ✅ STYLES — UNCHANGED */
const styles = {
  fullPage: { minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#020617", padding: "20px" },
  card: { width: "100%", maxWidth: "420px", backgroundColor: "#0f172a", padding: "30px", borderRadius: "24px", border: "1px solid #1e293b", boxShadow: "0 25px 50px rgba(0,0,0,0.5)", textAlign: "center" },
  headerSection: { marginBottom: "25px" },
  glowCircle: { width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "rgba(34, 211, 238, 0.1)", border: "1px solid #22d3ee", display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto 10px auto", color: "#22d3ee", fontSize: "20px" },
  title: { color: "#f8fafc", fontSize: "22px", margin: "0" },
  subtitle: { color: "#94a3b8", fontSize: "14px", marginTop: "5px" },
  highlight: { color: "#22d3ee" },
  badge: { display: "inline-block", padding: "4px 12px", backgroundColor: "#1e293b", color: "#facc15", borderRadius: "20px", fontSize: "12px", marginTop: "10px", border: "1px solid #334155" },
  form: { display: "flex", flexDirection: "column", gap: "15px", textAlign: "left" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "5px" },
  label: { fontSize: "11px", color: "#64748b", textTransform: "uppercase", letterSpacing: "1px" },
  input: { padding: "12px", borderRadius: "10px", border: "1px solid #1e293b", backgroundColor: "#020617", color: "#f8fafc", fontSize: "15px", outline: "none", cursor: "pointer" },
  priceRow: { display: "flex", justifyContent: "space-between", padding: "15px", backgroundColor: "rgba(30, 41, 59, 0.5)", borderRadius: "12px", color: "#94a3b8" },
  button: { padding: "15px", borderRadius: "12px", border: "none", backgroundColor: "#eab308", color: "#020617", fontWeight: "bold", fontSize: "16px", cursor: "pointer" },
  cancelLink: { background: "none", border: "none", color: "#475569", cursor: "pointer", marginTop: "5px" }
};

export default BookSlot;
