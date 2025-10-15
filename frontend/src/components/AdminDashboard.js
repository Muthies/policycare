import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [policies, setPolicies] = useState([]);

  // Fetch data when tab changes
  useEffect(() => {
    if (activeTab === "users") {
      axios
        .get("http://localhost:5000/api/admin/users")
        .then((res) => setUsers(res.data))
        .catch((err) => console.error("Error fetching users:", err));
    } else if (activeTab === "hospitals") {
      axios
        .get("http://localhost:5000/api/admin/hospitals")
        .then((res) => setHospitals(res.data))
        .catch((err) => console.error("Error fetching hospitals:", err));
    } else if (activeTab === "policies") {
      axios
        .get("http://localhost:5000/api/admin/policies")
        .then((res) => setPolicies(res.data))
        .catch((err) => console.error("Error fetching policies:", err));
    }
  }, [activeTab]);

  // Common table style
  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  };
  const thStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    backgroundColor: "#f0f0f0",
    textAlign: "left",
  };
  const tdStyle = {
    border: "1px solid #ccc",
    padding: "10px",
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          background: "#1E3A8A",
          color: "white",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ marginBottom: "40px", fontSize: "24px" }}>Admin Panel</h2>
        <ul style={{ listStyle: "none", padding: 0, flex: 1 }}>
          {["dashboard", "users", "hospitals", "policies"].map((tab) => (
            <li
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                marginBottom: "20px",
                cursor: "pointer",
                padding: "10px",
                borderRadius: "6px",
                backgroundColor: activeTab === tab ? "#3B82F6" : "transparent",
                transition: "0.3s",
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "30px", overflowY: "auto", background: "#F9FAFB" }}>
        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div>
            <h1 style={{ color: "#1E3A8A" }}>Dashboard Overview</h1>
            <p>Quick stats and charts will go here.</p>
          </div>
        )}

        {/* Users */}
        {activeTab === "users" && (
          <div>
            <h1 style={{ color: "#1E3A8A" }}>Total Users: {users.length}</h1>
            {users.length > 0 ? (
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Email</th>
                    <th style={thStyle}>Address</th>
                    <th style={thStyle}>State</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id}>
                      <td style={tdStyle}>{u.name}</td>
                      <td style={tdStyle}>{u.email}</td>
                      <td style={tdStyle}>{u.address}</td>
                      <td style={tdStyle}>{u.state}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No users to display.</p>
            )}
          </div>
        )}

        {/* Hospitals */}
        {activeTab === "hospitals" && (
          <div>
            <h1 style={{ color: "#1E3A8A" }}>Total Hospitals: {hospitals.length}</h1>
            {hospitals.length > 0 ? (
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Hospital Name</th>
                  </tr>
                </thead>
                <tbody>
                  {hospitals.map((h, index) => (
                    <tr key={index}>
                      <td style={tdStyle}>{h.hospitalName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No hospitals to display.</p>
            )}
          </div>
        )}

        {/* Policies */}
        {activeTab === "policies" && (
          <div>
            <h1 style={{ color: "#1E3A8A" }}>Total Insurance Providers: {policies.length}</h1>
            {policies.length > 0 ? (
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>Insurance Provider</th>
                  </tr>
                </thead>
                <tbody>
                  {policies.map((p, index) => (
                    <tr key={index}>
                      <td style={tdStyle}>{p.insuranceProvider}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No insurance providers to display.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
