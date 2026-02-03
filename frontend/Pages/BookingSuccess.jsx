import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function BookingSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(state || JSON.parse(localStorage.getItem("lastBooking")));
  const [ticketId, setTicketId] = useState("");

  // Generate a random ticket ID on load
  useEffect(() => {
    setTicketId(Math.random().toString(36).substr(2, 9).toUpperCase());
  }, []);

  if (!booking) {
    return (
      <div style={styles.fullPage}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.errorCard}>
          <h2 style={{ color: "#ef4444" }}>Session Expired</h2>
          <p style={{ color: "#94a3b8" }}>No active booking data was found.</p>
          <button onClick={() => navigate("/slots")} style={styles.secondaryBtn}>
            Return to Slots
          </button>
        </motion.div>
      </div>
    );
  }

  const { id, name, vehicle, time } = booking;

  return (
    <div style={styles.fullPage}>
      {/* SUCCESS BANNER */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={styles.successBanner}
      >
        <span style={styles.checkBadge}>✓</span>
        <h1 style={styles.successText}>Reservation Confirmed</h1>
      </motion.div>

      {/* THE DIGITAL PASS */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
        style={styles.ticket}
      >
        <div style={styles.ticketTop}>
          <div style={styles.ticketInfo}>
            <label style={styles.label}>TICKET ID</label>
            <div style={styles.value}>{ticketId}</div>
          </div>
          <div style={styles.slotCircle}>
            <label style={{ fontSize: "10px", color: "#22d3ee" }}>SLOT</label>
            <div style={{ fontSize: "28px", fontWeight: "900" }}>{id}</div>
          </div>
        </div>

        <div style={styles.divider}>
          <div style={styles.notchLeft} />
          <div style={styles.dashedLine} />
          <div style={styles.notchRight} />
        </div>

        <div style={styles.ticketBottom}>
          <div style={styles.row}>
            <div style={styles.column}>
              <label style={styles.label}>DRIVER</label>
              <div style={styles.detailValue}>{name}</div>
            </div>
            <div style={styles.column}>
              <label style={styles.label}>VEHICLE</label>
              <div style={styles.detailValue}>{vehicle}</div>
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.column}>
              <label style={styles.label}>ARRIVAL TIME</label>
              <div style={styles.detailValue}>🕒 {time}</div>
            </div>
            <div style={styles.column}>
              <label style={styles.label}>STATUS</label>
              <div style={{ ...styles.detailValue, color: "#22c55e" }}>ACTIVE</div>
            </div>
          </div>

          <div style={styles.qrContainer}>
             <div style={styles.qrCodePlaceholder}>
                {[...Array(25)].map((_, i) => (
                    <div key={i} style={{
                        width: "15px", 
                        height: "15px", 
                        backgroundColor: Math.random() > 0.5 ? "#f1f5f9" : "transparent"
                    }} />
                ))}
             </div>
             <p style={{ fontSize: "10px", marginTop: "10px", color: "#64748b" }}>SCAN AT ENTRANCE</p>
          </div>
        </div>
      </motion.div>

      {/* ACTION BUTTONS */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={styles.btnGroup}
      >
        <button onClick={() => {
          localStorage.removeItem("lastBooking");
          navigate("/slots");
        }} style={styles.secondaryBtn}>
          Book Another
        </button>
        <button onClick={() => {
          localStorage.removeItem("lastBooking");
          navigate("/");
        }} style={styles.primaryBtn}>
          Go Home
        </button>
      </motion.div>
    </div>
  );
}

// Styles remain same as your previous code
const styles = {
  fullPage: { minHeight: "100vh", backgroundColor: "#020617", display: "flex", flexDirection: "column", alignItems: "center", padding: "60px 20px", fontFamily: "'Inter', sans-serif" },
  successBanner: { textAlign: "center", marginBottom: "40px" },
  checkBadge: { width: "50px", height: "50px", backgroundColor: "#22c55e", borderRadius: "50%", display: "inline-flex", justifyContent: "center", alignItems: "center", color: "#fff", fontSize: "24px", marginBottom: "15px", boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)" },
  successText: { color: "#fff", fontSize: "28px", fontWeight: "800", margin: 0 },
  ticket: { width: "100%", maxWidth: "380px", backgroundColor: "#f8fafc", borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" },
  ticketTop: { padding: "30px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#1e293b", color: "#fff" },
  ticketInfo: { textAlign: "left" },
  slotCircle: { width: "70px", height: "70px", border: "2px solid #22d3ee", borderRadius: "50%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" },
  divider: { height: "30px", backgroundColor: "#f8fafc", position: "relative", display: "flex", alignItems: "center", overflow: "hidden" },
  notchLeft: { width: "30px", height: "30px", backgroundColor: "#020617", borderRadius: "50%", position: "absolute", left: "-15px" },
  notchRight: { width: "30px", height: "30px", backgroundColor: "#020617", borderRadius: "50%", position: "absolute", right: "-15px" },
  dashedLine: { width: "100%", borderBottom: "2px dashed #cbd5e1", margin: "0 20px" },
  ticketBottom: { padding: "30px", backgroundColor: "#fff" },
  row: { display: "flex", justifyContent: "space-between", marginBottom: "20px" },
  column: { textAlign: "left" },
  label: { fontSize: "10px", fontWeight: "bold", color: "#94a3b8", letterSpacing: "1px" },
  value: { fontSize: "20px", fontWeight: "800", color: "#22d3ee" },
  detailValue: { fontSize: "16px", fontWeight: "700", color: "#1e293b" },
  qrContainer: { marginTop: "30px", padding: "20px", border: "1px solid #f1f5f9", borderRadius: "16px", display: "flex", flexDirection: "column", alignItems: "center" },
  qrCodePlaceholder: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "5px", padding: "10px", backgroundColor: "#020617" },
  btnGroup: { marginTop: "40px", display: "flex", gap: "15px" },
  primaryBtn: { padding: "14px 30px", borderRadius: "12px", border: "none", backgroundColor: "#22d3ee", color: "#020617", fontWeight: "bold", cursor: "pointer" },
  secondaryBtn: { padding: "14px 30px", borderRadius: "12px", border: "1px solid #334155", backgroundColor: "transparent", color: "#f8fafc", fontWeight: "bold", cursor: "pointer" },
  errorCard: { backgroundColor: "#1e293b", padding: "40px", borderRadius: "20px", textAlign: "center" }
};

export default BookingSuccess;
