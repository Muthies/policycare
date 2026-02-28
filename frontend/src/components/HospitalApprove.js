// frontend/src/components/HospitalApprove.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const HospitalApprove = () => {
  const { qrId } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [qrStatus, setQrStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState("");

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(
          `https://policycare-backend.onrender.com/api/qr/${qrId}`
        );

        // qr contains user info in userId field
        setPatient(res.data.userId);
        setQrStatus(res.data.status);
        setLoading(false);
      } catch (error) {
        console.error("Fetch patient error:", error);
        setActionMsg("Failed to load patient details");
        setLoading(false);
      }
    };

    fetchPatient();
  }, [qrId]);

  const handleApprove = async () => {
    try {
      await axios.put(
        `https://policycare-backend.onrender.com/api/qr/approve/${qrId}`
      );
      setQrStatus("completed"); // update local status
      setActionMsg("Treatment Approved ✅");
    } catch (error) {
      console.error("Approve error:", error);
      setActionMsg("Approval failed ❌");
    }
  };

  // Optional: Withdraw button (if you implement backend route)
  // const handleWithdraw = async () => {
  //   try {
  //     await axios.put(
  //       `https://policycare-backend.onrender.com/api/qr/withdraw/${qrId}`
  //     );
  //     setQrStatus("withdrawn");
  //     setActionMsg("Request Withdrawn ❌");
  //   } catch (error) {
  //     console.error(error);
  //     setActionMsg("Failed to withdraw ❌");
  //   }
  // };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading patient...</h2>;
  if (!patient) return <h2 style={{ textAlign: "center" }}>No patient found</h2>;

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2>Patient Details</h2>
      <p><strong>Name:</strong> {patient.name}</p>
      <p><strong>Email:</strong> {patient.email}</p>
      <p><strong>Aadhaar:</strong> {patient.aadhaar}</p>
      <p><strong>Treatments done:</strong> {patient.treatments?.length || 0}</p>
      <p><strong>Status:</strong> {qrStatus}</p>

      <div style={{ marginTop: "20px" }}>
        {qrStatus !== "completed" && (
          <button onClick={handleApprove} style={{ marginRight: "10px" }}>Approve / Complete</button>
        )}
        {/* Uncomment if withdraw route is implemented */}
        {/* <button onClick={handleWithdraw} style={{ backgroundColor: "#f44336", color: "#fff" }}>Withdraw / Not Came</button> */}
      </div>

      {actionMsg && <p style={{ marginTop: "20px", fontWeight: "bold" }}>{actionMsg}</p>}
    </div>
  );
};

export default HospitalApprove;