import { useState } from "react";
import ApiClient from "../configs/apiClient";

const AdminPage = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleAddUser = async () => {
    const res = await ApiClient.post("/users", {
      username: user,
      password: password,
    });
    if (res.ok) {
      alert("User added successfully!");
      setUser("");
      setPassword("");
      setError(null);
    } else {
      setError("Failed to add user. Error: " + res.body.message);
    }
  };

  return (
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
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default AdminPage;
