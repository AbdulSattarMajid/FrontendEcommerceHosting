import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../Components/authComponents/AuthForm";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";


const SignupPage = ({ setToken, setUser,user }) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const backendUrl = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

        useEffect(() => {
        if (user) {
          toast.info("You are already signed in.");
          navigate("/");
        }
      }, [user, navigate]);

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!role) {
            toast.error("Please select a role");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setIsLoading(true);
        try {
            const { data } = await axios.post(`${backendUrl}/api/users/register`, {
                name,
                email,
                password,
                role,
            }, {
                withCredentials: true,
            });

            if (data.success) {
                Cookies.set('token', data.token, { expires: 7 });
                setUser(data.user);
                toast.success(data.message);
                navigate("/");
            }
            else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Signup failed");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <AuthForm
            mode="Signup"
            onSubmit={handleSignup}
            isLoading={isLoading}
            setUser={setUser}
            setName={setName}
            setEmail={setEmail}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            setRole={setRole}
            name={name}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            role={role}
            alternateLinkText="Already have an account?"
            alternateLinkAction={() => navigate("/login")}
        />

    );
};

export default SignupPage;
