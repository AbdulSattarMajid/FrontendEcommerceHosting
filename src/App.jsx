import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";

// Pages
import Home from "./pages/Home";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";

// Components
import Navbar from "./Components/landingPageComponents/Navbar";
import ForgotPassword from "./Components/authComponents/ForgetPassword";
import ResetPassword from "./Components/authComponents/ResetPassword";
import Chatbot from "./Components/Chatbot";

const backendUrl = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

function App() {
  const [user, setUser] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/users/profile`, {
          withCredentials: true,
        });
        setUser(data.user);
      } catch (err) {
        console.error("Not logged in:", err?.response?.data || err.message);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  // Pages where navbar should not be shown
  const hideNavbarOn = ["/login", "/signup"];

  return (
    <>
      <ToastContainer />
      {!hideNavbarOn.includes(location.pathname) && (
        <Navbar user={user} setUser={setUser} setIsChatOpen={setIsChatOpen} />
      )}
      <Chatbot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupPage setUser={setUser} user={user} />} />
        <Route path="/login" element={<LoginPage setUser={setUser} user={user} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/product" element={<CategoryPage user={user} />} />
        <Route path="/product/:title" element={<ProductDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        {/* Dashboard */}
        <Route path="/dashboard/*" element={<Profile user={user} />} />
      </Routes>
    </>
  );
}
