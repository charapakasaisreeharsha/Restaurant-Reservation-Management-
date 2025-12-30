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
    <div>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password"
        onChange={e => setPassword(e.target.value)} />
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
      </select>
      <button onClick={register}>Register</button>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
