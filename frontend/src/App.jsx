import { Routes, Route, useNavigate, Navigate, Link } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Blog from "./pages/Blog";

export default function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const navigate = useNavigate();

  const login = (u, p) => {
    if (u === "admin" && p === "123") {
      localStorage.setItem("user", u);
      setUser(u);
      navigate("/blog");
    } else alert("Sai tài khoản hoặc mật khẩu");
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div style={{ padding: 20 }}>
      <nav>
        <Link to="/blog">Blog</Link> |{" "}
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
      <hr />
      <Routes>
        <Route path="/login" element={<Login login={login} />} />
        <Route
          path="/blog"
          element={user ? <Blog /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}
