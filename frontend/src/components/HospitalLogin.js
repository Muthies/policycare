// frontend/src/components/HospitalLogin.js

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const HospitalLogin = () => {
  const navigate = useNavigate();
  const { qrId } = useParams();

  const [hospitalUsername, setHospitalUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  /* =====================================
     QR SCAN AUTO FLOW
  ===================================== */
  useEffect(() => {
    if (qrId) {
      const fetchQr = async () => {
        try {
          const res = await axios.get(
            `https://policycare-backend.onrender.com/api/qr/${qrId}`
          );

          const qrData = res.data;

          if (!qrData || !qrData.hospitalId) {
            setError("Invalid QR");
            return;
          }

          // ✅ STORE hospitalId (NOT username)
          localStorage.setItem("hospitalId", qrData.hospitalId._id);

          // Go to patient approval page
          navigate(`/hospital/patient/${qrId}`);

        } catch (err) {
          console.error(err);
          setError("QR not valid or expired");
        }
      };

      fetchQr();
    }
  }, [qrId, navigate]);

  /* =====================================
     NORMAL LOGIN
  ===================================== */
  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    console.log("Sending:", hospitalUsername, password);

    const res = await axios.post(
      "https://policycare-backend.onrender.com/api/hospital/login",
      {
        hospitalUsername,
        password,
      }
    );

    console.log("Response:", res.data);

    if (res.data.success) {
      localStorage.setItem("hospitalId", res.data.hospital._id);
      navigate("/hospital/dashboard");
    } else {
      setError(res.data.message || "Invalid credentials");
    }

  } catch (err) {
    console.error("Full error:", err);

    if (err.response) {
      console.log("Backend error response:", err.response.data);
      setError(err.response.data.message || "Login failed");
    } else {
      setError("Server not reachable");
    }
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