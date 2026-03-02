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
        const hospitalId = localStorage.getItem("hospitalId");

        if (!hospitalId) {
          alert("Hospital not logged in");
          navigate("/hospital/login");
          return;
        }

        const res = await axios.get(
          `https://policycare-backend.onrender.com/api/qr/${qrId}`
        );

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
  }, [qrId, navigate]);

  const handleApprove = async () => {
    try {
      const hospitalId = localStorage.getItem("hospitalId");

      if (!hospitalId) {
        alert("Hospital not logged in");
        return;
      }

      await axios.put(
        `https://policycare-backend.onrender.com/api/qr/approve/${qrId}`,
        { hospitalId } // ✅ send hospitalId for validation
      );

      setQrStatus("completed");
      setActionMsg("Treatment Approved ✅");

    } catch (error) {
      console.error("Approve error:", error);
      setActionMsg(
        error.response?.data?.message || "Approval failed ❌"
      );
    }
  };

  if (loading)
    return <h2 style={{ textAlign: "center" }}>Loading patient...</h2>;

  if (!patient)
    return <h2 style={{ textAlign: "center" }}>No patient found</h2>;

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px"
      }}
    >
      <h2>Patient Details</h2>

      <p><strong>Name:</strong> {patient.name}</p>
      <p><strong>Email:</strong> {patient.email}</p>
      <p><strong>Aadhaar:</strong> {patient.aadhaar}</p>
      <p><strong>Treatments done:</strong> {patient.treatments?.length || 0}</p>
      <p><strong>Status:</strong> {qrStatus}</p>

      <div style={{ marginTop: "20px" }}>
        {qrStatus !== "completed" && (
          <button
            onClick={handleApprove}
            style={{ marginRight: "10px" }}
          >
            Approve / Complete
          </button>
        )}
      </div>

      {actionMsg && (
        <p style={{ marginTop: "20px", fontWeight: "bold" }}>
          {actionMsg}
        </p>
      )}
    </div>
  );
};

export default HospitalApprove;