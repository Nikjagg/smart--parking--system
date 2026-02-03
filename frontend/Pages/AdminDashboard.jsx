import { useState, useEffect } from "react";
import axios from "axios";

function AdminDashboard() {
  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);

  const BASE_URL = "http://localhost:8080/api"; // backend base URL

  // ==================== FETCH DATA ====================
  const fetchData = () => {
    // Fetch slots
    axios.get(`${BASE_URL}/slots`)
      .then(res => setSlots(res.data))
      .catch(err => console.error("Failed to fetch slots", err));

    // Fetch bookings
    axios.get(`${BASE_URL}/bookings`)
      .then(res => setBookings(res.data))
      .catch(err => console.error("Failed to fetch bookings", err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ==================== TOGGLE SLOT AVAILABILITY ====================
  const toggleSlot = (id) => {
    const slot = slots.find(s => s.id === id);
    if (!slot) return;

    axios.put(`${BASE_URL}/slots/${id}`, { ...slot, available: !slot.available })
      .then(res => {
        // Update state locally
        setSlots(slots.map(s => s.id === id ? res.data : s));
      })
      .catch(err => console.error("Failed to update slot", err));
  };

  // ==================== DELETE BOOKING ====================
  const deleteBooking = (id) => {
    axios.delete(`${BASE_URL}/bookings/${id}`)
      .then(() => {
        setBookings(bookings.filter(b => b.id !== id));
      })
      .catch(err => console.error("Failed to delete booking", err));
  };

  // ==================== UI ====================
  return (
    <div style={{ maxWidth: "900px", margin: "50px auto", fontFamily: "Arial" }}>
      <h1 style={{ textAlign: "center" }}>Admin Dashboard</h1>

      {/* Slots Section */}
      <h2>All Slots</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "30px" }}>
        {slots.map(slot => (
          <div
            key={slot.id}
            onClick={() => toggleSlot(slot.id)}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              backgroundColor: slot.available ? "#16a34a" : "#f87171",
              color: "#fff",
              fontWeight: "bold",
              transition: "0.2s",
            }}
          >
            {slot.id}
          </div>
        ))}
      </div>

      {/* Bookings Section */}
      <h2>All Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={th}>Slot ID</th>
              <th style={th}>Institute</th>
              <th style={th}>Name</th>
              <th style={th}>Vehicle</th>
              <th style={th}>Email</th>
              <th style={th}>Phone</th>
              <th style={th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td style={td}>{b.slotId}</td>
                <td style={td}>{b.institute}</td>
                <td style={td}>{b.name}</td>
                <td style={td}>{b.vehicle}</td>
                <td style={td}>{b.email}</td>
                <td style={td}>{b.phone}</td>
                <td style={td}>
                  <button
                    onClick={() => deleteBooking(b.id)}
                    style={{
                      padding: "5px 10px",
                      border: "none",
                      borderRadius: "5px",
                      backgroundColor: "#f87171",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const th = { border: "1px solid #ccc", padding: "8px", background: "#2563eb", color: "#fff" };
const td = { border: "1px solid #ccc", padding: "8px", textAlign: "center" };

export default AdminDashboard;
