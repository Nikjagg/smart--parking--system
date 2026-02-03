import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginUser,
  registerUser,
  adminLogin,
  adminRegister,
  userForgotPassword,
  adminForgotPassword
} from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("user"); // user | admin
  const [mode, setMode] = useState("login"); 
  // login | register | forgot

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || (mode !== "forgot" && !password)) {
      alert("Please fill required fields");
      return;
    }

    setLoading(true);

    // ================= FORGOT PASSWORD =================
    if (mode === "forgot") {
      const apiCall =
        role === "admin"
          ? adminForgotPassword({ email })
          : userForgotPassword({ email });

      apiCall
        .then(() => {
          alert("Password reset link sent to email ✅");
          setMode("login");
        })
        .catch(() => alert("Email not found ❌"))
        .finally(() => setLoading(false));

      return;
    }

    // ================= ADMIN =================
    if (role === "admin") {
      const apiCall =
        mode === "register"
          ? adminRegister({ name, email, password })
          : adminLogin({ email, password });

      apiCall
        .then((res) => {
          localStorage.setItem("admin", JSON.stringify(res.data));
          localStorage.setItem("role", "admin");
          localStorage.setItem("isLoggedIn", "true");
          navigate("/admin");
        })
        .catch(() => alert("Admin authentication failed"))
        .finally(() => setLoading(false));

      return;
    }

    // ================= USER =================
    const userApi =
      mode === "register"
        ? registerUser({ name, email, password })
        : loginUser({ email, password });

    userApi
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("role", "user");
        localStorage.setItem("isLoggedIn", "true");
        navigate("/slots");
      })
      .catch(() => alert("User authentication failed"))
      .finally(() => setLoading(false));
  };

  // ================= UI (UNCHANGED) =================

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px",
  };

  const cardStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: "40px",
    borderRadius: "24px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  };

  const roleToggleContainer = {
    display: "flex",
    backgroundColor: "#f1f5f9",
    borderRadius: "15px",
    padding: "6px",
    marginBottom: "25px",
    gap: "5px",
  };

  const roleButtonStyle = (active) => ({
    flex: 1,
    padding: "12px",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    backgroundColor: active ? "#2563eb" : "transparent",
    color: active ? "white" : "#64748b",
    fontWeight: "600",
  });

  const inputStyle = {
    width: "100%",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "12px",
    border: "2px solid #e2e8f0",
    fontSize: "16px",
  };

  const loginButtonStyle = {
    width: "100%",
    padding: "15px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: role === "admin" ? "#1e293b" : "#2563eb",
    color: "white",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transform: isHovered ? "translateY(-2px)" : "none",
  };

  const linkStyle = {
    color: "#2563eb",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2>
          {mode === "login" && "Welcome Back"}
          {mode === "register" && "Create Account"}
          {mode === "forgot" && "Forgot Password"}
        </h2>

        <div style={roleToggleContainer}>
          <button
            type="button"
            style={roleButtonStyle(role === "user")}
            onClick={() => setRole("user")}
          >
            User Mode
          </button>
          <button
            type="button"
            style={roleButtonStyle(role === "admin")}
            onClick={() => setRole("admin")}
          >
            Admin Mode
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <input
              style={inputStyle}
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            style={inputStyle}
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {mode !== "forgot" && (
            <input
              type="password"
              style={inputStyle}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}

          <button
            type="submit"
            style={loginButtonStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {loading
              ? "Please wait..."
              : mode === "forgot"
              ? "Send Reset Link"
              : mode === "register"
              ? `Register as ${role}`
              : `Login as ${role}`}
          </button>
        </form>

        <div style={{ marginTop: "15px" }}>
          {mode === "login" && (
            <>
              <div>
                <span style={linkStyle} onClick={() => setMode("forgot")}>
                  Forgot Password?
                </span>
              </div>
              <div style={{ marginTop: "10px" }}>
                <span style={linkStyle} onClick={() => setMode("register")}>
                  Create Account
                </span>
              </div>
            </>
          )}

          {mode !== "login" && (
            <span style={linkStyle} onClick={() => setMode("login")}>
              Back to Login
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
