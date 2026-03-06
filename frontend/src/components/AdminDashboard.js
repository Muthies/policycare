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
    approved: 0, // ✅ changed from accepted
    monthlyUsers: 0,
    monthlyRequests: 0,
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
  try {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const [
      usersRes,
      hospitalsRes,
      reviewsRes,
      policiesRes,
      statsRes,
    ] = await Promise.all([
      axios.get("https://policycare-backend.onrender.com/api/admin/users", config),
      axios.get("https://policycare-backend.onrender.com/api/admin/hospitals", config),
      axios.get("https://policycare-backend.onrender.com/api/admin/reviews", config),
      axios.get("https://policycare-backend.onrender.com/api/admin/policies", config),
      axios.get("https://policycare-backend.onrender.com/api/admin/stats", config),
    ]);

    setUsers(usersRes.data);
    setHospitals(hospitalsRes.data);
    setReviews(reviewsRes.data);
    setPolicies(policiesRes.data);
    setStats(statsRes.data);

  } catch (err) {
    console.error("Admin fetch error:", err.response?.data || err.message);
  }
};

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>

        <nav className="sidebar-nav">
          <button
            className={activeTab === "overview" ? "active" : ""}
            onClick={() => setActiveTab("overview")}
          >
            Dashboard
          </button>

          <button
            className={activeTab === "users" ? "active" : ""}
            onClick={() => setActiveTab("users")}
          >
            Users
          </button>

          <button
            className={activeTab === "hospitals" ? "active" : ""}
            onClick={() => setActiveTab("hospitals")}
          >
            Hospitals
          </button>

          <button
            className={activeTab === "policies" ? "active" : ""}
            onClick={() => setActiveTab("policies")}
          >
            Policies
          </button>

          <button
            className={activeTab === "reviews" ? "active" : ""}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-content">
        <div className="content-header">
          <h1>
            {activeTab === "overview" && "Dashboard Overview"}
            {activeTab === "users" && `Users (${users.length})`}
            {activeTab === "hospitals" && `Hospitals (${hospitals.length})`}
            {activeTab === "policies" && "Insurance Policies"}
            {activeTab === "reviews" && `Reviews (${reviews.length})`}
          </h1>
        </div>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="card-grid">
            <div className="card">
              <span>Total Users</span>
              <h2>{stats.totalUsers || 0}</h2>
            </div>

            <div className="card">
              <span>Total Hospitals</span>
              <h2>{stats.totalHospitals || 0}</h2>
            </div>

            <div className="card">
              <span>Total Requests</span>
              <h2>{stats.totalRequests || 0}</h2>
            </div>

            <div className="card">
              <span>Approved</span>
              <h2>{stats.approved || 0}</h2>
            </div>

            <div className="card">
              <span>Pending</span>
              <h2>{stats.pending || 0}</h2>
            </div>

            <div className="card">
              <span>Completed</span>
              <h2>{stats.completed || 0}</h2>
            </div>

            <div className="card">
              <span>Monthly Users</span>
              <h2>{stats.monthlyUsers || 0}</h2>
            </div>

            <div className="card">
              <span>Monthly Requests</span>
              <h2>{stats.monthlyRequests || 0}</h2>
            </div>
          </div>
        )}

        {/* USERS */}
        {activeTab === "users" && (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
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
                    <td>{u.state || "-"}</td>
                    <td>{u.policies?.join(", ") || "-"}</td>
                    <td>{u.qrRequests?.length || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* HOSPITALS */}
        {activeTab === "hospitals" && (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Policy</th>
                  <th>Max Claim</th>
                </tr>
              </thead>
              <tbody>
                {hospitals.map((h) => (
                  <tr key={h._id}>
                    <td>{h.hospitalName}</td>
                    <td>{h.address}</td>
                    <td>{h.policyName}</td>
                    <td>₹{h.maxClaimAmount || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* POLICIES */}
        {activeTab === "policies" && (
          <div className="policy-grid">
            {policies.map((p) => (
              <div className="policy-card" key={p._id}>
                <h3>{p.name}</h3>
                <p>{p.details}</p>
                <span>{p.totalUsers || 0} Users</span>
              </div>
            ))}
          </div>
        )}

        {/* REVIEWS */}
        {activeTab === "reviews" && (
          <div className="review-grid">
            {reviews.map((r) => (
              <div className="review-card" key={r._id}>
                <h4>{r.user?.name || "Unknown User"}</h4>
                <p><strong>Hospital:</strong> {r.hospital?.hospitalName}</p>
                <p><strong>Rating:</strong> ⭐ {r.rating}</p>
                <p>{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;