import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);
    if (res.data.role === "ADMIN") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/user";
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password"
        onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}
