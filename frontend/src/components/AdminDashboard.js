import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css"; // import the CSS

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [reviews, setReviews] = useState([]);

  const policies = [
    "Star Health", "ICICI Lombard", "SBI General", "HDFC ERGO",
    "Aditya Birla Health", "IFFCO Tokio", "Niva Bupa", "Digit Insurance",
    "Bajaj Allianz", "Reliance Health", "Future Generali", "New India Assurance",
    "Oriental Insurance", "United India Insurance", "Tata AIG", "Care Health",
    "Chola MS", "Liberty General", "Manipal Cigna", "Max Bupa"
  ];

  useEffect(() => {
    if (activeTab === "users") {
      axios.get("https://policycare-backend.onrender.com/api/admin/users")
        .then(res => setUsers(res.data))
        .catch(err => console.error("Error fetching users:", err));
    } else if (activeTab === "hospitals") {
      axios.get("https://policycare-backend.onrender.com/api/admin/hospitals")
        .then(res => setHospitals(res.data))
        .catch(err => console.error("Error fetching hospitals:", err));
    } else if (activeTab === "reviews") {
      axios.get("https://policycare-backend.onrender.com/api/admin/reviews")
        .then(res => setReviews(res.data))
        .catch(err => console.error("Error fetching reviews:", err));
    }
  }, [activeTab]);

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li className={activeTab === "users" ? "active" : ""} onClick={() => setActiveTab("users")}>Users</li>
          <li className={activeTab === "hospitals" ? "active" : ""} onClick={() => setActiveTab("hospitals")}>Hospitals</li>
          <li className={activeTab === "policies" ? "active" : ""} onClick={() => setActiveTab("policies")}>Policies</li>
          <li className={activeTab === "reviews" ? "active" : ""} onClick={() => setActiveTab("reviews")}>Reviews</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {activeTab === "users" && (
          <div>
            <h1>Total Users: {users.length}</h1>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.address}</td>
                    <td>{u.state}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "hospitals" && (
          <div>
            <h1>Total Hospitals: {hospitals.length}</h1>
            {hospitals.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Hospital Name</th>
                    <th>Address</th>
                    <th>Insurance Provider</th>
                    <th>Max Claim Amount</th>
                    <th>Treatments Covered</th>
                  </tr>
                </thead>
                <tbody>
                  {hospitals.map(h => (
                    <tr key={h._id}>
                      <td>{h.hospitalName}</td>
                      <td>{h.address}</td>
                      <td>{h.insuranceProvider}</td>
                      <td>₹{h.maxClaimAmount}</td>
                      <td>{h.treatmentsCovered?.join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <p>No hospitals to display.</p>}
          </div>
        )}

        {activeTab === "policies" && (
          <div>
            <h1>Insurance Policies</h1>
            <table>
              <thead>
                <tr><th>Policy Name</th></tr>
              </thead>
              <tbody>
                {policies.map((p, idx) => <tr key={idx}><td>{p}</td></tr>)}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            <h1>Reviews</h1>
            {reviews.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Hospital</th>
                    <th>Rating</th>
                    <th>Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map(r => (
                    <tr key={r._id}>
                      <td>{r.user?.name || r.user}</td>
                      <td>{r.hospital?.hospitalName || r.hospital}</td>
                      <td>{r.rating}</td>
                      <td>{r.comment || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <p>No reviews to display.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
