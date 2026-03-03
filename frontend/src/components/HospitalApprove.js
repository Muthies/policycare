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
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [approving, setApproving] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const hospitalId = localStorage.getItem("hospitalId");
        if (!hospitalId) {
          navigate("/hospital/login");
          return;
        }

        const res = await axios.get(
          `https://policycare-backend.onrender.com/api/qr/${qrId}`
        );

        if (!res.data) {
          setActionMsg("QR not found or expired");
          setLoading(false);
          return;
        }

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

  const handleApproveClick = () => {
    setShowPassword(true); // show password input
  };

  const handleApproveSubmit = async (e) => {
    e.preventDefault();
    setApproving(true);
    try {
      const hospitalId = localStorage.getItem("hospitalId");
      if (!hospitalId) {
        navigate("/hospital/login");
        return;
      }

      const res = await axios.put(
        `https://policycare-backend.onrender.com/api/qr/approve/${qrId}`,
        { hospitalId, password }
      );

      setQrStatus("completed");
      setActionMsg("Treatment Approved ✅");
      setShowPassword(false);
      setPassword("");
    } catch (error) {
      console.error("Approve error:", error);
      setActionMsg(
        error.response?.data?.message || "Approval failed ❌"
      );
    } finally {
      setApproving(false);
    }
  };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading patient...</h2>;
  if (!patient) return <h2 style={{ textAlign: "center" }}>No patient found</h2>;

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" ,backgroundColor:"mintcream"}}>
      <h2>Patient Details</h2>
      <p><strong>Name:</strong> {patient.name}</p>
      <p><strong>Email:</strong> {patient.email}</p>
      <p><strong>Aadhaar:</strong> {patient.aadhaar}</p>
      <p><strong>Treatments done:</strong> {patient.treatments?.length || 0}</p>
      <p><strong>Status:</strong> {qrStatus}</p>

      {qrStatus !== "completed" && !showPassword && (
        <button onClick={handleApproveClick} style={{ marginTop: "20px" }}>
          Approve / Complete
        </button>
      )}

      {showPassword && (
        <form onSubmit={handleApproveSubmit} style={{ marginTop: "20px" }}>
          <input
            type="password"
            placeholder="Enter hospital password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: "8px", marginRight: "10px" }}
          />
          <button type="submit" disabled={approving}>
            {approving ? "Approving..." : "Submit"}
          </button>
        </form>
      )}

      {actionMsg && <p style={{ marginTop: "20px", fontWeight: "bold" }}>{actionMsg}</p>}
    </div>
  );
};

export default HospitalApprove;