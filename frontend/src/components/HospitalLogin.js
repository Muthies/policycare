// frontend/src/components/HospitalLogin.js

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const HospitalLogin = () => {
  const navigate = useNavigate();
  const { qrId } = useParams(); // if accessed via QR scan
  const [hospitalId, setHospitalId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // 🔥 If QR scan, auto-login
    if (qrId) {
      // Fetch QR info and hospital info from backend
      const fetchQr = async () => {
        try {
          const res = await axios.get(
            `https://policycare-backend.onrender.com/api/qr/${qrId}`
          );
          const qrData = res.data;

          if (!qrData) {
            setError("Invalid QR");
            return;
          }

          // Auto-login using hospitalId from QR
          setHospitalId(qrData.hospitalId);

          // Navigate directly to patient details
          navigate(`/hospital/patient/${qrId}`);
        } catch (err) {
          console.error(err);
          setError("QR not valid or expired");
        }
      };

      fetchQr();
    }
  }, [qrId, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "https://policycare-backend.onrender.com/api/hospital/login",
        { hospitalId, password }
      );

      if (res.data.success) {
        localStorage.setItem("hospitalId", hospitalId);
        navigate("/hospital/dashboard"); // redirect to hospital dashboard
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Hospital Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!qrId && (
        <form onSubmit={handleLogin}>
          <div>
            <label>Hospital ID:</label>
            <input
              type="text"
              value={hospitalId}
              onChange={(e) => setHospitalId(e.target.value)}
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

          <button type="submit">Login</button>
        </form>
      )}

      {qrId && <p>Redirecting to patient details...</p>}
    </div>
  );
};

export default HospitalLogin;