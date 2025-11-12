import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const navigate = useNavigate();

  const login = async (username, password) => {
    const res = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      alert("Login successful!");
      localStorage.setItem("user", username);
      navigate("/posts");
    } else {
      alert("Login failed.");
    }
  };

  return (
    <div className="page-container auth-page">
      <div className="auth-card">
        <h1>Login</h1>
        <form
          className="auth-form"
          onSubmit={(e) => {
            e.preventDefault();
            login(u, p);
          }}
        >
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              onChange={(e) => setU(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              placeholder="Enter your password"
              type="password"
              onChange={(e) => setP(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
