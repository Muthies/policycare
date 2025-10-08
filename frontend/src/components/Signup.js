// frontend/src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import '../style.css';

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    state: "",
    aadhaar: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/signup", form);
      alert(res.data.msg);
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div className="form-container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Signup</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        />

        <select
          name="state"
          value={form.state}
          onChange={handleChange}
          required
        >
          <option value="">Select State</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Kerala">Kerala</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Andhra Pradesh">Andhra Pradesh</option>
        </select>

        <input
          type="text"
          name="aadhaar"
          placeholder="Aadhaar Number"
          value={form.aadhaar}
          onChange={handleChange}
          required
        />

        <button type="submit">Signup</button>

        <p>
          Already have an account? <a href="/">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
