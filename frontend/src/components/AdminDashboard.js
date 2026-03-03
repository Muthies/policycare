import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const [users, setUsers] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalHospitals: 0,
    totalRequests: 0,
    pending: 0,
    completed: 0,
    accepted: 0,
    monthlyUsers: 0,
    monthlyRequests: 0,
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [
        usersRes,
        hospitalsRes,
        reviewsRes,
        policiesRes,
        statsRes,
      ] = await Promise.all([
        axios.get("https://policycare-backend.onrender.com/api/admin/users"),
        axios.get("https://policycare-backend.onrender.com/api/admin/hospitals"),
        axios.get("https://policycare-backend.onrender.com/api/admin/reviews"),
        axios.get("https://policycare-backend.onrender.com/api/admin/policies"),
        axios.get("https://policycare-backend.onrender.com/api/admin/stats"),
      ]);

      setUsers(usersRes.data);
      setHospitals(hospitalsRes.data);
      setReviews(reviewsRes.data);
      setPolicies(policiesRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error("Admin fetch error:", err);
    }
  };

  return (
    <div className="admin-container">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>PolicyCare</h2>
        <p className="admin-label">Admin Panel</p>
        <ul>
          <li onClick={() => setActiveTab("overview")} className={activeTab==="overview"?"active":""}>Dashboard</li>
          <li onClick={() => setActiveTab("users")} className={activeTab==="users"?"active":""}>Users</li>
          <li onClick={() => setActiveTab("hospitals")} className={activeTab==="hospitals"?"active":""}>Hospitals</li>
          <li onClick={() => setActiveTab("policies")} className={activeTab==="policies"?"active":""}>Policies</li>
          <li onClick={() => setActiveTab("reviews")} className={activeTab==="reviews"?"active":""}>Reviews</li>
        </ul>
      </div>

      {/* Main */}
      <div className="main-content">

        {/* OVERVIEW DASHBOARD */}
        {activeTab === "overview" && (
          <>
            <h1>Dashboard Overview</h1>

            <div className="stats-grid">
              <div className="stat-card gradient1">
                <h3>Total Users</h3>
                <p>{stats.totalUsers}</p>
              </div>
              <div className="stat-card gradient2">
                <h3>Total Hospitals</h3>
                <p>{stats.totalHospitals}</p>
              </div>
              <div className="stat-card gradient3">
                <h3>Total Requests</h3>
                <p>{stats.totalRequests}</p>
              </div>
              <div className="stat-card gradient4">
                <h3>Accepted</h3>
                <p>{stats.accepted}</p>
              </div>
            </div>

            <div className="stats-grid small">
              <div className="stat-card light">
                <h3>Pending Requests</h3>
                <p>{stats.pending}</p>
              </div>
              <div className="stat-card light">
                <h3>Completed</h3>
                <p>{stats.completed}</p>
              </div>
              <div className="stat-card light">
                <h3>Monthly Users</h3>
                <p>{stats.monthlyUsers}</p>
              </div>
              <div className="stat-card light">
                <h3>Monthly Requests</h3>
                <p>{stats.monthlyRequests}</p>
              </div>
            </div>
          </>
        )}

        {/* USERS */}
        {activeTab === "users" && (
          <>
            <h1>Users ({users.length})</h1>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>State</th>
                    <th>Policies</th>
                    <th>QR Requests</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.phone || "-"}</td>
                      <td>{u.state || "-"}</td>
                      <td>{u.policies?.join(", ") || "-"}</td>
                      <td>
                        <span className="badge">{u.qrRequests?.length || 0}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* HOSPITALS */}
        {activeTab === "hospitals" && (
          <>
            <h1>Hospitals ({hospitals.length})</h1>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Provider</th>
                    <th>Max Claim</th>
                    <th>Covered Treatments</th>
                  </tr>
                </thead>
                <tbody>
                  {hospitals.map((h) => (
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
            </div>
          </>
        )}

        {/* POLICIES */}
        {activeTab === "policies" && (
          <>
            <h1>Insurance Policies</h1>
            <div className="policy-grid">
              {policies.map((p) => (
                <div className="policy-card" key={p._id}>
                  <h3>{p.name}</h3>
                  <p>{p.details}</p>
                  <span>{p.totalUsers || 0} Users</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* REVIEWS */}
        {activeTab === "reviews" && (
          <>
            <h1>Reviews ({reviews.length})</h1>
            <div className="review-grid">
              {reviews.map((r) => (
                <div className="review-card" key={r._id}>
                  <h4>{r.user?.name}</h4>
                  <p><strong>Hospital:</strong> {r.hospital?.hospitalName}</p>
                  <p><strong>Rating:</strong> ⭐ {r.rating}</p>
                  <p>{r.comment}</p>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;