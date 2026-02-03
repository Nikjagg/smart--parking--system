import axios from "axios";

// ================= BASE CONFIG =================
const BASE_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// 🔐 AUTO TOKEN ATTACH (SESSION EXPIRED FIX)
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;

    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ================= USER PROFILE =================
export const getProfile = (userId) =>
  api.get(`/users/${userId}`);

export const updateProfile = (userId, data) =>
  api.put(`/users/${userId}`, data);

// ================= BOOKINGS =================
export const getUserBookings = (userId) =>
  api.get(`/bookings/user/${userId}`);

// ❌ CANCEL BOOKING (FIXED)
export const cancelBooking = (bookingId) =>
  api.put(`/bookings/cancel/${bookingId}`);


// ✅ CANCELLED BOOKINGS
export const getCancelledBookings = (userId) =>
  api.get(`/bookings/user/${userId}/cancelled`);


// 🧾 DOWNLOAD RECEIPT
export const downloadReceipt = (bookingId) =>
  api.get(`/bookings/receipt/${bookingId}`, {
    responseType: "blob"
  });


  // ================= ADMIN AUTH =================

export const adminRegister = (data) =>
  api.post("/admin/register", data);

export const adminLogin = (data) =>
  api.post("/admin/login", data);


// ================= AUTH =================
export const loginUser = (data) =>
  api.post(`/auth/login`, data);

export const registerUser = (data) =>
  api.post(`/auth/register`, data);

// ================= SLOTS =================
export const getSlots = (institute) =>
  api.get(`/slots?institute=${institute}`);

export const updateSlot = (id, data) =>
  api.put(`/slots/${id}`, data);

// ================= BOOK SLOT =================
export const bookSlot = (data) =>
  api.post(`/bookings`, data);

export const createBooking = (data) =>
  api.post(`/bookings`, data);

// ===== USER PASSWORD RESET =====
export const userForgotPassword = (data) =>
  api.post("/auth/forgot-password", data);

export const userResetPassword = (data) =>
  api.post("/auth/reset-password", data);

// ===== ADMIN PASSWORD RESET =====
export const adminForgotPassword = (data) =>
  api.post("/admin/forgot-password", data);

export const adminResetPassword = (data) =>
  api.post("/admin/reset-password", data);

export const getAdminDashboardStats = () =>
  api.get("/admin/dashboard/stats");

export default api;
