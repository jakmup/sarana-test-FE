import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout(); // Clear token
    navigate("/login"); // Redirect to login page
  }, [logout, navigate]);

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-lg font-semibold">Logging out...</p>
    </div>
  );
};

export default Logout;
