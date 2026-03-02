// frontend/src/components/TreatmentPage.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style.css";

const TreatmentPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          alert("User not logged in");
          return;
        }

        const res = await axios.get(
          `https://policycare-backend.onrender.com/api/users/${userId}`
        );

        setUser(res.data);
      } catch (err) {
        console.error("Failed to load treatment data:", err);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="treatment-container">
      <h2>Treatment Details</h2>

      <div className="treatment-card">
        <p><strong>Patient Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Aadhaar:</strong> {user.aadhaar}</p>

        <h3>Previous Treatments</h3>

        {user.treatments.length === 0 ? (
          <p>No treatments found</p>
        ) : (
          user.treatments.map((t, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <p><strong>Hospital:</strong> {t.hospitalId?.hospitalName}</p>
              <p><strong>Status:</strong> {t.status}</p>
              <p><strong>Date:</strong> {new Date(t.date).toLocaleDateString()}</p>
              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TreatmentPage;