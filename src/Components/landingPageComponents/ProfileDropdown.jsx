import React, { useEffect, useRef } from "react";
import { LogOut, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';


const ProfileDropdown = ({ user, onLogout, onClose }) => {
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className="absolute -right-12 top-16 z-50 w-56 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 animate-fade-in"
    >
      <div className="bg-gradient-to-b border-b-2 from-gray-100 to-white p-4 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xl font-bold shadow-md">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <h3 className="mt-3 text-sm font-semibold text-gray-900 text-center truncate w-full">
          {user.name}
        </h3>
        <p className="text-xs text-gray-500 text-center truncate w-full">
          {user.email}
        </p>
      </div>

      <div className="px-4 py-3 space-y-1.5 bg-white">
        <Link to="/dashboard/overview">   <button className="flex items-center gap-2 w-full p-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
          <User className="w-4 h-4 text-gray-500" />
          View Profile
        </button></Link>
       <Link to="/dashboard/settings"> <button className="flex items-center gap-2 w-full p-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
          <Settings className="w-4 h-4 text-gray-500" />
          Settings
        </button></Link>
        <button
          onClick={() => {
            Cookies.remove('token');
            onLogout();
            onClose();
          }}
          className="flex items-center gap-2 w-full p-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
