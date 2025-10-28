import { useState } from "react";

export default function Login({ login }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");

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
