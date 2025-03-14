import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ArticleForm from "./pages/ArticleForm";
import Logout from "./pages/Logout";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<ArticleForm />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/edit/:id" element={<ArticleForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
