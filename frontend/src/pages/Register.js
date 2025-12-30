import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  const register = async () => {
    await API.post("/auth/register", { name, email, password, role });
    alert("Registered! Please login.");
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Register</h2>
        <div className="input-group">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="input-group">
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <button className="btn-primary" onClick={register}>Register</button>
        <div className="link-text">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
