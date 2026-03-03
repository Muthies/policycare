// frontend/src/components/HospitalLogin.js

import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";

const HospitalLogin = () => {
  const navigate = useNavigate();
  const { qrId } = useParams();
  const location = useLocation();

  const [hospitalUsername, setHospitalUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Extract redirect param (from QR scan)
  const searchParams = new URLSearchParams(location.search);
  const redirectQR = searchParams.get("redirect") || qrId || null;

  useEffect(() => {
    // If hospital is already logged in and redirectQR exists
    const hospitalId = localStorage.getItem("hospitalId");
    if (hospitalId && redirectQR) {
      navigate(`/hospital/approve/${redirectQR}`);
    }
  }, [navigate, redirectQR]);

  /* =====================================
     HANDLE HOSPITAL LOGIN
  ===================================== */
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://policycare-backend.onrender.com/api/hospital/login",
        { hospitalUsername, password }
      );

      if (res.data.success) {
        // ✅ Store only hospitalId
        localStorage.setItem("hospitalId", res.data.hospital._id);

        // Redirect to QR approve page if coming from QR scan
        if (redirectQR) {
          navigate(`/hospital/approve/${redirectQR}`);
        } else {
          navigate("/hospital/dashboard");
        }
      } else {
        setError(res.data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Hospital Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <div>
          <label>Hospital Username:</label>
          <input
            type="text"
            value={hospitalUsername}
            onChange={(e) => setHospitalUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {redirectQR && !error && (
        <p style={{ marginTop: "10px" }}>
          After login, you will be redirected to the QR approval page...
        </p>
      )}
    </div>
  );
};

export default HospitalLogin;