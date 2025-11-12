import React from "react";
import { useState } from "react";
const AdminPage = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleAddUser = async () => {
    const res = await fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: user, password: password }),
    });
    if (res.ok) {
      alert("User added successfully!");
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <p>Quản lý bài viết và người dùng</p>
      <h1>ADd user</h1>
      <input
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="username"
      />{" "}
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
};

export default AdminPage;
