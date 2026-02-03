import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api"; // <-- Import API mapping

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [isHovered, setIsHovered] = useState(false);

  // Handle form submit
  async function handleRegister(e) {
    e.preventDefault();

    const { name, email, password } = formData;
    if (!name || !email || !password) {
      alert("Please fill all fields!");
      return;
    }

    try {
      // Call backend API
      const res = await registerUser({ name, email, password });
      
      // Save user in localStorage after successful registration
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "user");
      localStorage.setItem("user", JSON.stringify(res.data)); // Store user data

      alert("Registration successful ✅");
      navigate("/slots"); // Redirect after registration
    } catch (err) {
      console.error(err);
      alert("Registration failed ❌. Try again.");
    }
  }

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // --- STYLES ---
  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    fontFamily: "'Poppins', sans-serif",
    padding: "20px",
  };

  const cardStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: "40px",
    borderRadius: "24px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    backdropFilter: "blur(10px)",
  };

  const inputStyle = {
    width: "100%",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "12px",
    border: "2px solid #e2e8f0",
    outline: "none",
    fontSize: "16px",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    width: "100%",
    padding: "15px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#22c55e",
    color: "white",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "10px",
    transform: isHovered ? "translateY(-3px)" : "translateY(0)",
    boxShadow: isHovered ? "0 8px 20px rgba(34, 197, 94, 0.35)" : "none",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={{ color: "#1e293b", margin: "0 0 10px 0", fontSize: "28px" }}>Join Us</h2>
        <p style={{ color: "#64748b", marginBottom: "30px" }}>Create your parking account</p>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#22c55e")}
            onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#22c55e")}
            onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#22c55e")}
            onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
          />
          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Create Account
          </button>
        </form>

        <div style={{ marginTop: "20px", borderTop: "1px solid #f1f5f9", paddingTop: "20px" }}>
          <p style={{ fontSize: "14px", color: "#64748b" }}>
            Already have an account?{" "}
            <span 
              style={{ color: "#2563eb", cursor: "pointer", fontWeight: "bold" }}
              onClick={() => navigate("/login")}
            >
              Login Here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
