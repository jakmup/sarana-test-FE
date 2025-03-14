import { useState, useContext } from "react";
import { login } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const { login: setToken } = useContext(AuthContext)!;
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const token = await login(email);
      console.log("Received token from API:", token); // ✅ Debugging log

      if (token) {
        localStorage.setItem("token", token); // ✅ Store token in localStorage
        setToken(token); // ✅ Save token in AuthContext
        navigate("/dashboard");
      } else {
        alert("Login failed: No token received");
      }
    } catch (error) {
      const axiosError = error as AxiosError
      console.error("Login error:", axiosError.response?.data); // ✅ Debugging log
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="email"
          className="w-full border p-2 rounded-md mb-4"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
