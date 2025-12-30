import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const role = localStorage.getItem("role");
      if (role === "ADMIN") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/user", { replace: true });
      }
    }
  }, [navigate]);

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
    <div className="page-container">
      <div className="form-container">
        <h2>Login</h2>
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
        <button className="btn-primary" onClick={login}>Login</button>
        <div className="link-text">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}
