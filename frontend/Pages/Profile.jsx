import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import{
  
  createbooking,
  getProfile,
  updateProfile,
  getUserBookings,
  cancelBooking,
  getCancelledBookings,
  downloadReceipt
} from "../services/api"; // ✅



function Profile() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const tab = params.get("tab") || "details";

  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [cancelled, setCancelled] = useState([]);
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.id) {
      getProfile(storedUser.id)
        .then(res => setUser(res.data))
        .catch(() => alert("Failed to load profile"));

      getUserBookings(storedUser.id)
        .then(res => setBookings(res.data))
        .catch(() => alert("Failed to load bookings"));

      getCancelledBookings(storedUser.id)
        .then(res => setCancelled(res.data))
        .catch(() => alert("Failed to load cancelled bookings"));

      // Receipts = all bookings
      getUserBookings(storedUser.id)
        .then(res => setReceipts(res.data))
        .catch(() => alert("Failed to load receipts"));
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.pageTitle}>My Account</h2>
      <div style={styles.mainLayout}>
        <div style={styles.sidebar}>
          <Link
            to="/profile?tab=details"
            style={tab === "details" ? styles.activeSidebarItem : styles.sidebarItem}
          >
            👤 User Details
          </Link>
          <Link
            to="/profile?tab=bookings"
            style={tab === "bookings" ? styles.activeSidebarItem : styles.sidebarItem}
          >
            📄 Booking Details
          </Link>
          <Link
            to="/profile?tab=edit"
            style={tab === "edit" ? styles.activeSidebarItem : styles.sidebarItem}
          >
            ✏️ Edit Profile
          </Link>
          <Link
            to="/profile?tab=cancelled"
            style={tab === "cancelled" ? styles.activeSidebarItem : styles.sidebarItem}
          >
            ❌ Cancelled Booking
          </Link>
          <Link
            to="/profile?tab=receipt"
            style={tab === "receipt" ? styles.activeSidebarItem : styles.sidebarItem}
          >
            ⬇️ Download Receipt
          </Link>
          <Link to="/helpdesk" style={styles.sidebarItem}>
            🎧 Helpdesk
          </Link>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>

        <div style={styles.contentArea}>
          <motion.div
            key={tab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {tab === "details" && <UserDetails user={user} />}
            {tab === "bookings" && (
              <BookingDetails bookings={bookings} setBookings={setBookings} />
            )}
            {tab === "edit" && <EditProfile user={user} setUser={setUser} />}
            {tab === "cancelled" && <CancelledBookings cancelled={cancelled} />}
            {tab === "receipt" && <ReceiptsView receipts={receipts} />}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ================= Components =================

const UserDetails = ({ user }) => {
  if (!user) return <p>Loading...</p>;
  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>User Information</h3>
      <div><b>Name:</b> {user.name}</div>
      <div><b>Email:</b> {user.email}</div>
      <div><b>Phone:</b> {user.phone}</div>
      <div><b>Address:</b> {user.address}</div>
    </div>
  );
};

const EditProfile = ({ user, setUser }) => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "" });

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "name") {
      setFormData({ ...formData, [name]: value.replace(/[^a-zA-Z\s]/g, "") });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdate = () => {
    updateProfile(user.id, formData)
      .then(res => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
        alert("Profile Updated Successfully ✅");
      })
      .catch(() => alert("Update failed ❌"));
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>✏️ Edit Profile</h3>
      {["name","email","phone","address"].map(field => (
        <div key={field} style={{ marginBottom: "10px" }}>
          <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          {field === "address" ? (
            <textarea
              name={field}
              value={formData[field]}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px" }}
            />
          ) : (
            <input
              name={field}
              value={formData[field]}
              onChange={handleChange}
              style={{ width: "100%", padding: "10px" }}
            />
          )}
        </div>
      ))}
      <button onClick={handleUpdate} style={styles.saveBtn}>Save</button>
    </div>
  );
};

const BookingDetails = ({ bookings, setBookings }) => {
  const handleCancel = (id) => {
    if(window.confirm("Are you sure you want to cancel this booking?")) {
      cancelBooking(id)
        .then(() => setBookings(prev => prev.filter(b => b.id !== id)))
        .catch(() => alert("Cancel failed"));
    }
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>Active Bookings</h3>
      {bookings.length === 0 ? (
        <p>No active bookings.</p>
      ) : (
        bookings.map(b => (
          <div key={b.id} style={styles.bookingRow}>
            <div>
              <p style={{ margin: 0, fontWeight: "bold" }}>Slot: P-{b.slotId} ({b.institute})</p>
              <small style={{ color: "#64748b" }}>{new Date(b.bookingTime).toLocaleString()}</small>
              <p>Name: {b.name}</p>
              <p>Vehicle: {b.vehicle}</p>
              <p>Duration: {b.duration}</p>
              <p>Price: {b.price}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={styles.statusBadge}>CONFIRMED</span>
              <button onClick={() => handleCancel(b.id)} style={styles.cancelBtnUI}>Cancel Booking</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const CancelledBookings = ({ cancelled }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>❌ Cancelled History</h3>
      {cancelled.length === 0 ? <p>No cancelled bookings.</p> :
        cancelled.map((b, i) => (
        <div key={i} style={styles.bookingRow}>
          <p><b>P-{b.slotId}</b> - {b.institute}</p>
          <span style={{ ...styles.statusBadge, backgroundColor: "#fee2e2", color: "#991b1b" }}>CANCELLED</span>
        </div>
      ))}
    </div>
  );
};

const ReceiptsView = ({ receipts }) => {
  const handleDownload = (id) => {
    downloadReceipt(id)
      .then(res => {
        const blob = new Blob([res.data], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `receipt_${id}.txt`;
        link.click();
      })
      .catch(() => alert("Failed to download receipt"));
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>⬇️ Download Receipts</h3>
      {receipts.length === 0 ? <p>No receipts available.</p> :
        receipts.map(b => (
        <div key={b.id} style={styles.bookingRow}>
          <p><b>P-{b.slotId}</b> - {b.institute}</p>
          <button onClick={() => handleDownload(b.id)} style={styles.downloadBtn}>Download PDF</button>
        </div>
      ))}
    </div>
  );
};

// ================= Styles =================

const styles = {
  container: { padding: "40px 10%", backgroundColor: "#f8fafc", minHeight: "100vh", fontFamily: 'sans-serif' },
  pageTitle: { marginBottom: "30px", fontSize: "28px", fontWeight: "bold", color: "#0f172a" },
  mainLayout: { display: "grid", gridTemplateColumns: "280px 1fr", gap: "30px" },
  sidebar: { backgroundColor: "#fff", padding: "10px", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" },
  sidebarItem: { display: "flex", alignItems: "center", padding: "14px 15px", textDecoration: "none", color: "#475569", borderBottom: "1px solid #f1f5f9" },
  activeSidebarItem: { display: "flex", alignItems: "center", padding: "14px 15px", textDecoration: "none", color: "#0f172a", fontWeight: "bold", borderLeft: "4px solid #0f172a", backgroundColor: "#f8fafc" },
  contentArea: { width: "100%" },
  card: { backgroundColor: "#fff", padding: "30px", borderRadius: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" },
  cardTitle: { marginBottom: "20px", fontSize: "20px", fontWeight: "bold" },
  saveBtn: { width: "100%", padding: "14px", backgroundColor: "#0f172a", color: "white", borderRadius: "10px", cursor: 'pointer', border: 'none', fontWeight: 'bold' },
  logoutBtn: { width: "90%", margin: "20px auto 10px", display: 'block', padding: "12px", backgroundColor: "#0f172a", color: "white", borderRadius: "10px", border: "none", cursor: "pointer" },
  bookingRow: { display: "flex", justifyContent: "space-between", padding: "15px 0", borderBottom: "1px solid #f1f5f9", alignItems: "center" },
  statusBadge: { fontSize: "11px", padding: "4px 10px", borderRadius: "20px", backgroundColor: "#dcfce7", color: "#166534", fontWeight: "bold" },
  cancelBtnUI: { display: 'block', marginTop: '5px', color: '#ef4444', background: 'none', border: '1px solid #fca5a5', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' },
  downloadBtn: { padding: '8px 15px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }
};

export default Profile;
