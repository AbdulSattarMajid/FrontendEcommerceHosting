import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../Components/authComponents/AuthForm";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";


const LoginPage = ({ setToken, setUser,user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const backendUrl = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

    useEffect(() => {
    if (user) {
      toast.info("You are now signed in.");
      navigate("/");
    }
  }, [user, navigate]);
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/users/login`, {
        email,
        password,
      }, {
        withCredentials: true,
      });

      if (data.success) {
        setUser(data.user);
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      mode="Login"
      onSubmit={handleLogin}
      setUser={setUser}
      isLoading={isLoading}
      setEmail={setEmail}
      setPassword={setPassword}
      email={email}
      password={password}
      alternateLinkText="Don't have an account?"
      alternateLinkAction={() => navigate("/signup")}
    />
  );
};

export default LoginPage;
