import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [reviews, setReviews] = useState([]);

  const policies = [
    "Star Health",
    "ICICI Lombard",
    "SBI General",
    "HDFC ERGO",
    "Aditya Birla Health",
    "IFFCO Tokio",
    "Niva Bupa",
    "Digit Insurance",
    "Bajaj Allianz",
    "Reliance Health",
    "Future Generali",
    "New India Assurance",
    "Oriental Insurance",
    "United India Insurance",
    "Tata AIG",
    "Care Health",
    "Chola MS",
    "Liberty General",
    "Manipal Cigna",
    "Max Bupa"
  ];

  // Fetch users or hospitals depending on active tab
  useEffect(() => {
    if (activeTab === "users") {
      axios.get("http://localhost:5000/api/admin/users")
        .then(res => setUsers(res.data))
        .catch(err => console.error("Error fetching users:", err));
    } else if (activeTab === "hospitals") {
      axios.get("http://localhost:5000/api/admin/hospitals")
        .then(res => setHospitals(res.data))
        .catch(err => console.error("Error fetching hospitals:", err));
    }
    if (activeTab === "reviews") {
  axios.get("http://localhost:5000/api/admin/reviews")
    .then(res => setReviews(res.data))
    .catch(err => console.error("Error fetching reviews:", err));
}
  }, [activeTab]);

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
      
      {/* Left Sidebar */}
      <div style={{ width: "220px", background: "#1E3A8A", color: "white", padding: "20px" }}>
        <h2 style={{ marginBottom: "40px" }}>Admin Panel</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li onClick={() => setActiveTab("users")} style={{ marginBottom: "20px", cursor: "pointer" }}>Users</li>
          <li onClick={() => setActiveTab("hospitals")} style={{ marginBottom: "20px", cursor: "pointer" }}>Hospitals</li>
          <li onClick={() => setActiveTab("policies")} style={{ marginBottom: "20px", cursor: "pointer" }}>Policies</li>
          <li onClick={() => setActiveTab("reviews")} style={{ cursor: "pointer" }}>Reviews</li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        
        {/* Users Tab */}
        {activeTab === "users" && (
          <div>
            <h1>Total Users: {users.length}</h1>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f0f0f0" }}>
                  <th style={{ border: "1px solid #ccc", padding: "8px" }}>Name</th>
                  <th style={{ border: "1px solid #ccc", padding: "8px" }}>Email</th>
                  <th style={{ border: "1px solid #ccc", padding: "8px" }}>Address</th>
                  <th style={{ border: "1px solid #ccc", padding: "8px" }}>State</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id}>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>{u.name}</td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>{u.email}</td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>{u.address}</td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>{u.state}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Hospitals Tab */}
        {activeTab === "hospitals" && (
          <div>
            <h1>Total Hospitals: {hospitals.length}</h1>
            {hospitals.length > 0 ? (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f0f0f0" }}>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>Hospital Name</th>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>Address</th>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>Insurance Provider</th>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>Max Claim Amount</th>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>Treatments Covered</th>
                  </tr>
                </thead>
                <tbody>
                  {hospitals.map(h => (
                    <tr key={h._id}>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>{h.hospitalName}</td>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>{h.address}</td>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>{h.insuranceProvider}</td>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>₹{h.maxClaimAmount}</td>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {h.treatmentsCovered?.join(", ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No hospitals to display.</p>
            )}
          </div>
        )}

        {/* Policies Tab */}
        {activeTab === "policies" && (
          <div>
            <h1>Insurance Policies</h1>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "#f0f0f0" }}>
                  <th style={{ border: "1px solid #ccc", padding: "8px" }}>Policy Name</th>
                </tr>
              </thead>
              <tbody>
                {policies.map((p, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>{p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Reviews Tab */}
       {activeTab === "reviews" && (
  <div>
    <h1>Reviews</h1>
    {reviews.length > 0 ? (
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>User</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Hospital</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Rating</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Comment</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((r) => (
            <tr key={r._id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{r.user}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{r.hospital}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{r.rating}</td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>{r.comment || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No reviews to display.</p>
    )}
  </div>
)}

      </div>
    </div>
  );
};

export default AdminDashboard;
