import React from "react";
import { useState, useEffect } from "react";
import { getUserRole } from "../services/blogApi"; // ✅ Import API function
import { useNavigate } from "react-router-dom";

const RoleButton = () => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRole = async () => {
      const role = await getUserRole();
      setUserRole(role);
    };

    fetchRole();
  }, []);

  if (userRole !== "Admin") {
    return null; // ✅ Hide button if not admin
  }

  return (
    <button className="bg-red-500 w-20 tracking-tight rounded-md px-3 py-2 text-sm mb-7 inline-block" onClick={() => navigate("/admin")} >
      Admin Dashboard
    </button>
  )
}
export default RoleButton;