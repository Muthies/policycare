import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HospitalDashboard = () => {
  const navigate = useNavigate();
  const hospitalId = localStorage.getItem("hospitalId");
  const [requests, setRequests] = useState([]);

  useEffect(() => {
  const fetchRequests = async () => {
    try {
      const hospitalId = localStorage.getItem("hospitalId")?.trim(); // ✅ trim spaces
      console.log("Hospital ID in dashboard:", hospitalId); // debug

      const res = await axios.get(
        `https://policycare-backend.onrender.com/api/qr/hospital/${hospitalId}`
      );
      console.log("Requests fetched:", res.data); // debug
      setRequests(res.data); // array of requested QR objects
    } catch (err) {
      console.error(err);
    }
  };

  fetchRequests();
}, []);

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
      <h2>Patient Requests</h2>
      {requests.length === 0 ? (
        <p>No requests yet</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Email</th>
              <th>Aadhaar</th>
              <th>QR ID</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>{req.userId?.name || "N/A"}</td>
                <td>{req.userId?.email || "N/A"}</td>
                <td>{req.userId?.aadhaar || "N/A"}</td>
                <td>{req._id}</td>
                <td>{req.status}</td>
                <td>
                  <button
                    onClick={() => navigate(`/hospital/patient/${req._id}`)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HospitalDashboard;