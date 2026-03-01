// frontend/src/components/HospitalLogin.js

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const HospitalLogin = () => {
  const navigate = useNavigate();
  const { qrId } = useParams(); // if accessed via QR scan

  const [hospitalUsername, setHospitalUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // 🔥 If QR scan, auto-fetch hospital from QR
    if (qrId) {
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

          // ✅ Set hospitalUsername from QR
          setHospitalUsername(qrData.hospitalUsername);

          // ✅ Store in localStorage
          localStorage.setItem("hospitalUsername", qrData.hospitalUsername);

          // Redirect to patient details
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
        {
          hospitalUsername,
          password,
        }
      );

      if (res.data.success) {
        // ✅ Store correct key
        localStorage.setItem("hospitalUsername", hospitalUsername);

        navigate("/hospital/dashboard");
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

          <button type="submit">Login</button>
        </form>
      )}

      {qrId && <p>Redirecting to patient details...</p>}
    </div>
  );
};

export default HospitalLogin;