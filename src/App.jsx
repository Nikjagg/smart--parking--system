import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import ProtectedRoute from "./Components/ProtectedRoute";
import Chatbot from "./Components/Chatbot"; // ✅ Naya Component

// Pages Import
import Home from "./Pages/Home";
import Slots from "./Pages/Slots";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import BookSlot from "./Pages/BookSlot";
import BookingSuccess from "./Pages/BookingSuccess";
import AdminDashboard from "./Pages/AdminDashboard";
import Profile from "./Pages/Profile";
import ForgotPassword from "./Pages/ForgotPassword"; 
import Helpdesk from "./Pages/Helpdesk";

function App() {
  return (
    <>
      <Navbar />
      
      <Routes>
        {/* 🟢 PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* 🔴 ADMIN PROTECTED */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 🔵 USER PROTECTED ROUTES */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/helpdesk" 
          element={
            <ProtectedRoute>
              <Helpdesk />
            </ProtectedRoute>
          } 
        />

        <Route
          path="/Slots"
          element={
            <ProtectedRoute>
              <Slots />
            </ProtectedRoute>
          }
        />

        <Route
          path="/book/:id"
          element={
            <ProtectedRoute>
              <BookSlot />
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking-success"
          element={
            <ProtectedRoute>
              <BookingSuccess />
            </ProtectedRoute>
          }
        />

        {/* ⚪ 404 - PAGE NOT FOUND */}
        <Route 
          path="*" 
          element={
            <div style={styles.errorPage}>
              <h1>404</h1>
              <p>Oops! The page you're looking for doesn't exist.</p>
            </div>
          } 
        />
      </Routes>

      {/* ✅ Chatbot added globally */}
      <Chatbot /> 
    </>
  );
}

const styles = {
  errorPage: {
    color: 'white', 
    textAlign: 'center', 
    marginTop: '100px',
    fontFamily: 'Arial, sans-serif'
  }
};

export default App;