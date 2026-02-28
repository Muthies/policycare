import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `https://policycare-backend.onrender.com//api/users/${userId}`
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

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>No profile found</p>;

  return (
    <div style={{ border: "1px solid #ccc", padding: "15px", borderRadius: "10px", marginBottom: "30px" }}>
      <h2>{profile.name}'s Profile</h2>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Aadhaar:</strong> {profile.aadhaar}</p>

      <h3>Past Treatments</h3>
      {profile.treatments?.length === 0 ? (
        <p>No past treatments</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Hospital</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {profile.treatments.map((t) => (
              <tr key={t.qrId}>
                <td>{t.hospitalName}</td>
                <td>{t.status}</td>
                <td>{new Date(t.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserProfile;