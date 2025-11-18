import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../configs/apiClient";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    const res = await ApiClient.post("/users/register", {
      username: username,
      password: password,
    });
    if (res.ok) {
      alert("User registered successfully!");
      setUsername("");
      setPassword("");
      setError(null);
      navigate("/login");
    } else {
      setError("Failed to register. Error: " + res.body.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Register</h1>
        <form
          className="auth-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Create Account
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
