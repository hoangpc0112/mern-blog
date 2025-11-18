import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../configs/apiClient";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async () => {
    const res = await ApiClient.post("/users/login", {
      username,
      password,
    });
    if (res.ok) {
      alert("Login successful!");
      setUsername("");
      setPassword("");
      localStorage.setItem("user", res.body.username);
      navigate("/posts");
    } else {
      setError("Login failed. Error: " + res.body.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Login</h1>
        <form
          className="auth-form"
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Login
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
}
