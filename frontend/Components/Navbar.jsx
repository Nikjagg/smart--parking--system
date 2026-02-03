import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [open, setOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    setOpen(false);
    navigate("/login");
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <>
      <nav style={styles.nav}>
        <h2 style={styles.logo}>SmartParking</h2>
        <div style={styles.right}>
          <Link to="/" style={styles.link}>Home</Link>
          {isLoggedIn && <Link to="/slots" style={styles.link}>Slots</Link>}
          {!isLoggedIn && <Link to="/login" style={styles.link}>Login</Link>}
          {isLoggedIn && (
            <div style={styles.avatar} onClick={() => setOpen(true)}>U</div>
          )}
        </div>
      </nav>

      {open && <div style={styles.overlay} onClick={() => setOpen(false)} />}

      <div style={{ ...styles.sidePanel, transform: open ? "translateX(0)" : "translateX(100%)" }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ margin: 0 }}>My Account</h3>
          <button onClick={() => setOpen(false)} style={styles.closeBtn}>✕</button>
        </div>

        <Link to="/profile?tab=details" style={styles.panelItem} onClick={() => setOpen(false)}>👤 User Details</Link>
        <Link to="/profile?tab=bookings" style={styles.panelItem} onClick={() => setOpen(false)}>📄 Booking Details</Link>
        <Link to="/profile?tab=edit" style={styles.panelItem} onClick={() => setOpen(false)}>✏️ Edit Profile</Link>
        <Link to="/profile?tab=cancelled" style={styles.panelItem} onClick={() => setOpen(false)}>❌ Cancelled Booking</Link>
        <Link to="/profile?tab=receipt" style={styles.panelItem} onClick={() => setOpen(false)}>⬇️ Download Receipt</Link>
        <Link to="/helpdesk" style={styles.panelItem} onClick={() => setOpen(false)}>🎧 Helpdesk</Link>

        <button onClick={handleLogout} style={styles.logoutBtnSide}>Logout</button>
      </div>
      <div style={{ height: 70 }} />
    </>
  );
}

const styles = {
  nav: { position: "fixed", top: 0, left: 0, right: 0, height: 70, display: "flex", justifyContent: "space-between", padding: "0 40px", backgroundColor: "#0f172a", color: "white", alignItems: "center", zIndex: 100 },
  logo: { margin: 0 },
  right: { display: "flex", alignItems: "center" },
  link: { marginLeft: "20px", color: "white", textDecoration: "none", fontWeight: "500" },
  avatar: { width: 38, height: 38, borderRadius: "50%", backgroundColor: "#38bdf8", color: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: 20, cursor: "pointer", fontWeight: "bold" },
  sidePanel: { position: "fixed", top: 0, right: 0, height: "100vh", width: 300, backgroundColor: "#ffffff", padding: 25, boxShadow: "-5px 0 15px rgba(0,0,0,0.3)", transition: "transform 0.3s ease", zIndex: 200, display: "flex", flexDirection: "column" },
  panelItem: { display: "block", padding: "15px 0", textDecoration: "none", color: "#0f172a", fontWeight: "500", borderBottom: "1px solid #eee", fontSize: "15px", cursor: "pointer" },
  closeBtn: { background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' },
  logoutBtnSide: { marginTop: "auto", marginBottom: 20, width: "100%", padding: 12, backgroundColor: "#0f172a", color: "white", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: "bold" },
  overlay: { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.4)", zIndex: 150 }
};

export default Navbar;