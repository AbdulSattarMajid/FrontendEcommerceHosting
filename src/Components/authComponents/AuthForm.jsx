import { useState } from "react";
import { motion } from "framer-motion";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";

const backendUrl = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const AuthForm = ({
  mode,
  onSubmit,
  isLoading,
  setName,
  setEmail,
  setPassword,
  setConfirmPassword,
  confirmPassword,
  role,
  setRole,
  name,
  email,
  password,
  alternateLinkText,
  alternateLinkAction,
  setUser
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 w-full max-w-md shadow"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          {mode === "Login" ? "Login" : "Create Account"}
        </h2>

        <form onSubmit={onSubmit}>
          <div className="mt-6">
            <div className="flex items-center justify-center gap-4">
              <div className="w-full">
                <GoogleLogin
                  onSuccess={async (credentialResponse) => {
                    try {
                      const { credential } = credentialResponse;
                      if (!role) {
                        toast.error("Please select a role before using Google Signup.");
                        navigate("/signup")
                        return;
                      }
                      const { data } = await axios.post(
                        `${backendUrl}/api/users/auth/google`,
                        { token: credential,role },
                        {
                          headers: { 'Content-Type': 'application/json' },
                          withCredentials: true,
                        }
                      );

                      if (data?.user) {
                        setUser(data.user);
                        navigate("/");
                      } else {
                        console.error("No user returned from Google auth");
                      }
                    } catch (err) {
                      console.error("Google login failed:", err);
                    }
                  }}

                  onError={() => {
                    console.log("Login Failed");
                  }}
                  theme="filled_black"
                  size="large"
                  shape="pill"
                  width="auto"
                />
              </div>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">or continue with email</span>
              </div>
            </div>
          </div>

          {mode === "Signup" && (
            <div className="border border-gray-300 px-6 py-3 flex items-center gap-3 rounded-full">
              <img src={assets.profile_icon} alt="Name" className="w-5 h-5" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Full name"
                className="w-full focus:outline-none"
                required
              />
            </div>
          )}

          <div className="border border-gray-300 px-6 py-3 flex items-center gap-3 rounded-full mt-4">
            <img src={assets.email_icon} alt="Email" className="w-5 h-5" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email address"
              className="w-full focus:outline-none"
              required
            />
          </div>

          <div className="border border-gray-300 px-6 py-3 flex items-center gap-3 rounded-full mt-4">
            <img src={assets.lock_icon} alt="Password" className="w-5 h-5" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              className="w-full focus:outline-none"
              minLength={6}
              required
            />
          </div>
          {mode === "Signup" && (
            <div className="border border-gray-300 px-6 py-3 flex items-center gap-3 rounded-full mt-4">
              <img src={assets.lock_icon} alt="Confirm Password" className="w-5 h-5" />
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                type="password"
                placeholder="Confirm Password"
                className="w-full focus:outline-none"
                minLength={6}
                required
              />
            </div>
          )}
          {mode === "Signup" && (
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Signup as:</label>
              <div className="flex gap-4">
                {["Customer", "Seller", "Courier"].map((r) => (
                  <label key={r} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="role"
                      value={r}
                      checked={role === r}
                      onChange={(e) => setRole(e.target.value)}
                      required
                    />
                    <span>{r}</span>
                  </label>
                ))}
              </div>

              {/* Google Login - OUTSIDE the map */}

            </div>
          )}


          {mode === "Login" && (
            <Link to="/forgot-password">   <p className="text-sm text-red-600 my-4 cursor-pointer">
              Forgot password?
            </p></Link>
          )}

          <button
            type="submit"
            className="bg-blue-600 w-full text-white py-3 rounded-full font-medium mt-2 hover:bg-blue-700 transition disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : mode === "Login" ? "Login" : "Create Account"}
          </button>
        </form>

        <p className="mt-5 text-center text-gray-600">
          {alternateLinkText}
          <span
            className="text-yellow-600 font-medium ml-1 cursor-pointer"
            onClick={alternateLinkAction}
          >
            {mode === "Login" ? "Sign up" : "Login"}
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthForm;
