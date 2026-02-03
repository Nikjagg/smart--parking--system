import { useNavigate } from "react-router-dom";

function SlotCard({ slot, selectedSlot, selectSlot }) {
  const navigate = useNavigate();
  const isSelected = selectedSlot === slot.id;

  function handleClick() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    if (slot.available) {
      selectSlot(slot.id);
      navigate(`/book/${slot.id}`);
    } else {
      alert("This slot is already booked!");
    }
  }

  return (
    <div
      onClick={handleClick}
      style={{
        width: "60px",
        height: "60px",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        userSelect: "none",
        backgroundColor: slot.available ? "#d1fae5" : "#fca5a5",
        cursor: slot.available ? "pointer" : "not-allowed",
        transform: isSelected ? "scale(1.2)" : "scale(1)",
        boxShadow: isSelected
          ? "0 0 15px 3px #2563eb"
          : "0 4px 10px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
      }}
      title={slot.available ? "Click to book" : "Already booked"}
    >
      <div style={{ fontSize: "14px", marginBottom: "2px" }}>{slot.number}</div>
      <div style={{ fontSize: "12px", color: slot.available ? "#166534" : "#991b1b" }}>
        {slot.available ? "Available" : "Booked"}
      </div>
    </div>
  );
}

export default SlotCard;
