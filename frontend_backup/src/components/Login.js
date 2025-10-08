// frontend/src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import '../style.css'; // Make sure style.css exists in src/

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", { email, password });
      alert(res.data.msg);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("name", res.data.name);
      navigate("/policyentry"); // <-- react-router navigation
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };


  return (
    <div className="form-container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <a href="/signup">Signup</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
