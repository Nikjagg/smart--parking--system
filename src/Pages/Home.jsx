import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#020617", minHeight: "100vh" }}>

      {/* HERO SECTION */}
      <motion.section
        style={styles.hero}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          style={styles.heroBadge}
        >
          ✨ The Future of Urban Mobility
        </motion.div>
        
        <h1 style={styles.title}>Smart Parking <br/> System</h1>
        <p style={styles.subtitle}>
          Find and book parking slots easily.  
          Save time, reduce traffic, and park smart with real-time analytics.
        </p>

        <motion.button
          style={styles.primaryBtn}
          whileHover={{ scale: 1.05, backgroundColor: "#22d3ee", color: "#020617" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/slots")}
        >
          Explore Live Slots
        </motion.button>
      </motion.section>

      {/* FEATURES SECTION */}
      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>Engineered for Efficiency</h2>

        <div style={styles.featureGrid}>
          {features.map((item, index) => (
            <motion.div
              key={index}
              style={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10, borderColor: "#06b6d4", backgroundColor: "#0f172a" }}
            >
              <div style={styles.iconWrapper}>{item.icon}</div>
              <h3 style={{ color: "#f1f5f9", marginBottom: "10px", fontSize: "20px" }}>{item.title}</h3>
              <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.6" }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={styles.steps}>
        <h2 style={{ ...styles.sectionTitle, color: "#f1f5f9" }}>Three Steps to Park</h2>
        <motion.div 
          style={styles.stepsContainer}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div style={styles.stepItem}>
            <div style={styles.stepNumber}>01</div>
            <p style={styles.stepText}>Search live slots</p>
          </div>
          <div style={styles.stepItem}>
            <div style={styles.stepNumber}>02</div>
            <p style={styles.stepText}>Instant Reservation</p>
          </div>
          <div style={styles.stepItem}>
            <div style={styles.stepNumber}>03</div>
            <p style={styles.stepText}>Navigate & Park</p>
          </div>
        </motion.div>
      </section>

      {/* CTA SECTION */}
      <motion.section
        style={styles.cta}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 style={{ fontSize: "42px", fontWeight: "800", marginBottom: "20px" }}>Ready to Start?</h2>
        <p style={{ color: "#cffafe", marginBottom: "30px", opacity: 0.8 }}>Join thousands of smart drivers today.</p>
        <motion.button
          style={styles.secondaryBtn}
          whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/login")}
        >
          Create Free Account
        </motion.button>
      </motion.section>

    </div>
  );
}

const features = [
  { icon: "⚡", title: "Instant Access", desc: "Real-time synchronization with cloud-based parking sensors." },
  { icon: "🛡️", title: "Secure Payments", desc: "Encrypted transactions for a worry-free booking experience." },
  { icon: "📊", title: "Data Driven", desc: "Heatmaps and traffic analytics to find the best spots faster." }
];

const styles = {
  hero: {
    height: "90vh",
    background: "radial-gradient(circle at 50% -20%, #083344 0%, #020617 80%)",
    color: "#f8fafc",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "20px"
  },
  heroBadge: {
    padding: "8px 20px",
    background: "rgba(8, 51, 68, 0.5)",
    border: "1px solid #0891b2",
    borderRadius: "100px",
    color: "#22d3ee",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "24px"
  },
  title: {
    fontSize: "72px",
    fontWeight: "900",
    lineHeight: "1.1",
    letterSpacing: "-0.04em",
    marginBottom: "24px",
    color: "#f1f5f9"
  },
  subtitle: {
    fontSize: "20px",
    maxWidth: "600px",
    marginBottom: "44px",
    color: "#94a3b8",
    lineHeight: "1.6"
  },
  primaryBtn: {
    padding: "18px 44px",
    fontSize: "16px",
    border: "2px solid #0891b2",
    borderRadius: "12px",
    cursor: "pointer",
    backgroundColor: "transparent",
    color: "#22d3ee",
    fontWeight: "700",
    transition: "all 0.3s ease",
    boxShadow: "0 0 20px rgba(8, 145, 178, 0.2)"
  },
  features: {
    padding: "120px 40px",
    backgroundColor: "#020617"
  },
  sectionTitle: {
    fontSize: "40px",
    fontWeight: "800",
    textAlign: "center",
    marginBottom: "80px",
    color: "#f1f5f9",
    letterSpacing: "-0.02em"
  },
  featureGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap"
  },
  card: {
    width: "320px",
    padding: "50px 35px",
    borderRadius: "20px",
    background: "#020617",
    border: "1px solid #1e293b",
    textAlign: "left",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
  },
  iconWrapper: {
    fontSize: "40px",
    marginBottom: "24px",
    display: "block"
  },
  steps: {
    padding: "100px 20px",
    backgroundColor: "#08334410", // Very faint cyan tint
    borderTop: "1px solid #1e293b",
    borderBottom: "1px solid #1e293b",
  },
  stepsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "80px",
    flexWrap: "wrap",
    marginTop: "40px"
  },
  stepItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px"
  },
  stepNumber: {
    fontSize: "48px",
    fontWeight: "900",
    color: "transparent",
    WebkitTextStroke: "1px #0891b2",
    fontFamily: "monospace"
  },
  stepText: {
    color: "#94a3b8",
    fontWeight: "600",
    fontSize: "18px"
  },
  cta: {
    padding: "120px 20px",
    background: "linear-gradient(180deg, #020617 0%, #083344 100%)",
    color: "white",
    textAlign: "center"
  },
  secondaryBtn: {
    padding: "16px 48px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    background: "#22d3ee",
    fontWeight: "800",
    color: "#020617",
    fontSize: "16px",
    transition: "all 0.3s ease"
  }
};

export default Home;