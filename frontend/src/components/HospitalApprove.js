// frontend/src/components/HospitalApprove.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const HospitalApprove = () => {
  const { qrId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState("");

  useEffect(() => {
    // Fetch QR / patient details
    const fetchPatient = async () => {
      try {
        const res = await axios.get(
          `https://policycare-backend.onrender.com/api/qr/${qrId}`
        );

        setPatient(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setActionMsg("Failed to load patient details");
        setLoading(false);
      }
    };

    fetchPatient();
  }, [qrId]);

  const handleApprove = async () => {
    try {
      const res = await axios.put(
        `https://policycare-backend.onrender.com/api/qr/approve/${qrId}`
      );
      setActionMsg("Treatment Approved ✅");
      // Optionally redirect to hospital dashboard
      // navigate("/hospital/dashboard");
    } catch (error) {
      console.error(error);
      setActionMsg("Approval failed ❌");
    }
  };

  const handleWithdraw = async () => {
    try {
      const res = await axios.put(
        `https://policycare-backend.onrender.com/api/qr/withdraw/${qrId}`
      );
      setActionMsg("Request Withdrawn ❌");
      // Optionally redirect to dashboard
      // navigate("/hospital/dashboard");
    } catch (error) {
      console.error(error);
      setActionMsg("Failed to withdraw ❌");
    }
  };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading patient...</h2>;

  if (!patient) return <h2 style={{ textAlign: "center" }}>No patient found</h2>;

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2>Patient Details</h2>
      <p><strong>Name:</strong> {patient.name}</p>
      <p><strong>Aadhaar:</strong> {patient.aadhaar}</p>
      <p><strong>Insurance:</strong> {patient.insurance}</p>
      <p><strong>Card No:</strong> {patient.cardNo}</p>
      <p><strong>Treatment:</strong> {patient.treatment || "Not specified"}</p>
      <p><strong>Status:</strong> {patient.status}</p>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleApprove} style={{ marginRight: "10px" }}>Approve / Complete</button>
        <button onClick={handleWithdraw} style={{ backgroundColor: "#f44336", color: "#fff" }}>Withdraw / Not Came</button>
      </div>

      {actionMsg && <p style={{ marginTop: "20px", fontWeight: "bold" }}>{actionMsg}</p>}
    </div>
  );
};

export default HospitalApprove;