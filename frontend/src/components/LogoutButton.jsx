import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutUser } from "../services/blogApi";
const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logoutUser();

      if (!response || !response.data?.success) {
      }


      // ✅ Ensure proper token removal
      localStorage.removeItem("token");
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

      toast.success("✅ Logged out successfully!");
      navigate("/login", { replace: true });

    } catch (error) {
      console.error("🚨 Logout error:", error);
      toast.error("❌ Failed to log out. Please try again.");
    }
  };

  return (
    <div className="relative w-full">
      <button
      onClick={handleLogout}
      className="absolute top-4 right-4 px-4 py-2 bg-blue-400 text-white rounded-lg transition-all"
    >
      Logout
    </button>
    </div>
  );
};

export default LogoutButton;