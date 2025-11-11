import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const navigate = useNavigate();

  const login = async (username, password) => {
    const res = await fetch("http://localhost:8080/api/login", {
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
    <div>
      <h2>Login</h2>
      <input placeholder="user" onChange={(e) => setU(e.target.value)} />
      <input
        placeholder="pass"
        type="password"
        onChange={(e) => setP(e.target.value)}
      />
      <button onClick={() => login(u, p)}>Login</button>
    </div>
  );
}
