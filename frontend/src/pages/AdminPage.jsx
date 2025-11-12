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
    <div className="page-container">
      <div className="form-card">
        <h1>Admin Panel</h1>
        <form
          className="post-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddUser();
          }}
        >
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
