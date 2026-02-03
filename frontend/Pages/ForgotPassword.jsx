import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  // Styles Object
  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      fontFamily: "'Poppins', sans-serif",
    },
    card: {
      backgroundColor: "white",
      padding: "40px",
      borderRadius: "24px",
      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
      width: "90%",
      maxWidth: "400px",
      textAlign: "center",
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {!submitted ? (
          <>
            <h2>Reset Password</h2>
            <p style={{ color: "#64748b", marginBottom: "20px" }}>Enter your email to get a reset link.</p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email Address"
                required
                style={{ width: "100%", padding: "12px", marginBottom: "20px", borderRadius: "8px", border: "1px solid #ccc" }}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button style={{ width: "100%", padding: "12px", backgroundColor: "#f5576c", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
                Send Link
              </button>
            </form>
          </>
        ) : (
          <div>
            <h2 style={{ color: "#22c55e" }}>Link Sent!</h2>
            <p>Check <b>{email}</b> for instructions.</p>
          </div>
        )}
        <p 
          onClick={() => navigate("/login")} 
          style={{ color: "#2563eb", cursor: "pointer", marginTop: "20px", fontWeight: "bold" }}
        >
          Back to Login
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword; // Yeh line check karein