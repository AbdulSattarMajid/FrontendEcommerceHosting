import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const VerifyEmailPage = () => {
    const [isVerifying, setIsVerifying] = useState(true);
    const [success, setSuccess] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const backendUrl = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get("token");

        if (!token) {
            setSuccess(false);
            setIsVerifying(false);
            return;
        }

  const verifyEmail = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/users/verify-email?token=${token}`);

    if (data.success) {
      toast.success("Email verified successfully!");
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } else {
      setSuccess(false);
      toast.error(data.message || "Verification failed");
    }
  } catch (error) {
    setSuccess(false);
    toast.error(error.response?.data?.message || "Verification failed");
  } finally {
    setIsVerifying(false);
  }
};

        verifyEmail();
    }, [location, navigate, backendUrl]);

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            {isVerifying ? (
                <h2>Verifying your email...</h2>
            ) : success ? (
                <h2>Email verified! Redirecting to login...</h2>
            ) : (
                <h2>Verification failed. Please try again or contact support.</h2>
            )}
        </div>
    );
};

export default VerifyEmailPage;
