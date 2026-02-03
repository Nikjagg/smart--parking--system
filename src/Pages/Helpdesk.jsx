import React, { useState } from "react";
import { motion } from "framer-motion";

function Helpdesk() {
  const [ticket, setTicket] = useState({ name: "", email: "", issue: "" });

  // 🛡️ Logic: Only allow letters and spaces
  const handleNameChange = (e) => {
    const value = e.target.value;
    // Yeh Regex check karta hai ki input sirf A-Z, a-z aur spaces ho
    const onlyLetters = value.replace(/[^a-zA-Z\s]/g, "");
    setTicket({ ...ticket, name: onlyLetters });
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    
    // Final check for name (incase of bypass)
    if (ticket.name.trim().length < 2) {
      alert("Please enter a valid name (at least 2 letters).");
      return;
    }

    alert("Support Ticket Submitted! Our team will contact you soon.");
    setTicket({ name: "", email: "", issue: "" });
  };

  return (
    <div style={styles.pageWrapper}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        style={styles.container}
      >
        {/* Header Section */}
        <div style={styles.header}>
          <h2 style={styles.title}>Helpdesk Support</h2>
          <p style={styles.subtitle}>How can we assist you today?</p>
        </div>

        {/* Quick Contact Cards */}
        <div style={styles.contactGrid}>
          <div style={styles.contactCard}>
            <span style={styles.icon}>📞</span>
            <h4>Call Us</h4>
            <p style={styles.contactDetail}>+91 98765 43210</p>
          </div>
          <div style={styles.contactCard}>
            <span style={styles.icon}>✉️</span>
            <h4>Email Support</h4>
            <p style={styles.contactDetail}>help@smartparking.com</p>
          </div>
          <div style={styles.contactCard}>
            <span style={styles.icon}>💬</span>
            <h4>WhatsApp</h4>
            <p style={styles.contactDetail}>Chat with Agent</p>
          </div>
        </div>

        {/* Support Form Section */}
        <div style={styles.supportFormSection}>
          <h3 style={styles.formTitle}>Raise a Ticket</h3>
          <form onSubmit={handleSupportSubmit} style={styles.form}>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <input 
                type="text" 
                placeholder="Enter your name (Letters only)" 
                style={styles.input}
                value={ticket.name}
                onChange={handleNameChange} // ✅ Validation function used here
                required 
              />
              {/* Optional: Chhota warning message */}
              <small style={{color: "#64748b", fontSize: "10px"}}>* Numbers and special characters are not allowed</small>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                style={styles.input}
                value={ticket.email}
                onChange={(e) => setTicket({...ticket, email: e.target.value})}
                required 
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Describe Issue</label>
              <textarea 
                placeholder="Tell us about the problem..." 
                style={{...styles.input, minHeight: "100px", resize: "none"}}
                value={ticket.issue}
                onChange={(e) => setTicket({...ticket, issue: e.target.value})}
                required 
              ></textarea>
            </div>

            <button type="submit" style={styles.submitBtn}>Submit Request</button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

// ... styles object (wahi rahega jo aapne diya tha) ...
const styles = {
  pageWrapper: {
    minHeight: "100vh",
    backgroundColor: "#020617",
    display: "flex",
    justifyContent: "center",
    paddingTop: "60px",
    paddingBottom: "40px",
    fontFamily: "Arial, sans-serif"
  },
  container: { width: "90%", maxWidth: "800px", padding: "20px" },
  header: { textAlign: "center", marginBottom: "40px" },
  title: { color: "#f8fafc", fontSize: "32px", margin: "0 0 10px 0" },
  subtitle: { color: "#94a3b8", fontSize: "16px" },
  contactGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "40px" },
  contactCard: { backgroundColor: "#0f172a", padding: "25px", borderRadius: "16px", border: "1px solid #1e293b", textAlign: "center", color: "#f8fafc" },
  icon: { fontSize: "30px", marginBottom: "10px", display: "block" },
  contactDetail: { color: "#22d3ee", fontSize: "14px", fontWeight: "bold" },
  supportFormSection: { backgroundColor: "#0f172a", padding: "30px", borderRadius: "24px", border: "1px solid #1e293b", boxShadow: "0 25px 50px rgba(0,0,0,0.5)" },
  formTitle: { color: "#f8fafc", marginBottom: "20px", fontSize: "20px" },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { fontSize: "12px", color: "#64748b", textTransform: "uppercase" },
  input: { padding: "14px", borderRadius: "10px", border: "1px solid #1e293b", backgroundColor: "#020617", color: "#f8fafc", outline: "none", fontSize: "15px" },
  submitBtn: { padding: "16px", borderRadius: "12px", border: "none", backgroundColor: "#eab308", color: "#020617", fontWeight: "bold", fontSize: "16px", cursor: "pointer", marginTop: "10px" }
};

export default Helpdesk;