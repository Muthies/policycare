import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `https://policycare-backend.onrender.com/api/users/${userId}`
        );
        setProfile(res.data);
      } catch (err) {
        console.error("Fetch profile error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) return null;
  if (!profile) return null;

  return (
    <div style={{ position: "relative", marginBottom: "20px" }}>
      
      {/* 🔹 Profile Image Button */}
      <div
        onClick={() => setShowProfile(!showProfile)}
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: "blue",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: "bold",
          cursor: "pointer",
          marginLeft: "auto"
        }}
        title="Click to view profile"
      >
        {profile.name.charAt(0).toUpperCase()}
      </div>

      {/* 🔹 Profile Details Card */}
      {showProfile && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "60px",
            width: "350px",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "15px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            zIndex: 1000
          }}
        >
          <h3>{profile.name}</h3>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Aadhaar:</strong> {profile.aadhaar}</p>

          <h4>Past Treatments</h4>

          {profile.treatments?.length === 0 ? (
            <p>No past treatments</p>
          ) : (
            <div style={{ maxHeight: "200px", overflowY: "auto" }}>
              {profile.treatments.map((t) => (
                <div
                  key={t._id}
                  style={{
                    borderBottom: "1px solid #eee",
                    padding: "5px 0"
                  }}
                >
                  <p style={{ margin: 0 }}>
                    <strong>
                      {t.hospitalId?.hospitalName || "Unknown Hospital"}
                    </strong>
                  </p>
                  <small>
                    {t.status} •{" "}
                    {t.date
                      ? new Date(t.date).toLocaleDateString()
                      : "-"}
                  </small>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;