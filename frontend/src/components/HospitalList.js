import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style.css";

const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [treatmentFilter, setTreatmentFilter] = useState(
    localStorage.getItem("treatment") || ""
  );
  const [userAddress, setUserAddress] = useState(
    localStorage.getItem("userAddress") || "Madurai"
  );

  const insurance = localStorage.getItem("insurance");
  const userId = localStorage.getItem("userId");

  // Fetch hospitals for selected insurance
  useEffect(() => {
    if (insurance) {
      axios
        .get(`http://localhost:5000/api/hospitals/${insurance}`)
        .then((res) => setHospitals(res.data))
        .catch((err) => console.log(err));
    }
  }, [insurance]);

  // Filter & sort hospitals
  useEffect(() => {
    let data = [...hospitals];

    // 1️⃣ Filter by treatment if entered
    if (treatmentFilter.trim()) {
      data = data.filter((h) =>
        h.treatmentsCovered?.some(
          (t) => t.toLowerCase() === treatmentFilter.trim().toLowerCase()
        )
      );
    }

    // 2️⃣ Sort by: Coverage > Location proximity > Reviews > Name
    const coveragePriority = { "Family Floater": 3, Family: 2, Individual: 1 };

    data.sort((a, b) => {
      // Coverage type
      const covDiff =
        (coveragePriority[b.coverageType] || 0) -
        (coveragePriority[a.coverageType] || 0);
      if (covDiff !== 0) return covDiff;

      // Location priority: check if hospital address includes user address
      const aNear = a.address.toLowerCase().includes(userAddress.toLowerCase());
      const bNear = b.address.toLowerCase().includes(userAddress.toLowerCase());
      if (aNear && !bNear) return -1;
      if (!aNear && bNear) return 1;

      // Reviews: more reviews first
      const aReviews = a.reviews?.length || 0;
      const bReviews = b.reviews?.length || 0;
      if (bReviews !== aReviews) return bReviews - aReviews;

      // Fallback alphabetical
      return a.hospitalName.localeCompare(b.hospitalName);
    });

    setFilteredHospitals(data);
  }, [treatmentFilter, hospitals, userAddress]);

  // QR code navigation
  const handleGenerateQR = (hospitalName) => {
    localStorage.setItem("hospital", hospitalName);
    window.location.href = "/qr";
  };

  // Submit review
  const handleReviewSubmit = async () => {
    if (!comment.trim()) return alert("Please enter a review comment.");
    if (!userId) return alert("You must be logged in to submit a review.");

    try {
      await axios.post("http://localhost:5000/api/reviews", {
        hospitalId: selectedHospital._id,
        userId,
        rating,
        comment,
      });

      alert("✅ Review added successfully!");
      setSelectedHospital(null);
      setRating(5);
      setComment("");

      // Refresh hospital data
      axios
        .get(`http://localhost:5000/api/hospitals/${insurance}`)
        .then((res) => setHospitals(res.data));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Error adding review");
    }
  };

  return (
    <div className="table-container">
      <h2>Hospitals</h2>

      {/* Treatment Filter */}
      <input
        type="text"
        placeholder="Filter by Treatment (e.g., Emergency Surgery)"
        value={treatmentFilter}
        onChange={(e) => setTreatmentFilter(e.target.value)}
        style={{ marginBottom: "15px", padding: "8px", width: "300px" }}
      />

      <table className="hospital-table">
        <thead>
          <tr>
            {[
              "Hospital Name",
              "Policy Name",
              "Coverage Type",
              "Claim Days",
              "Treatments",
              "Actions",
            ].map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredHospitals.map((h, i) => (
            <tr key={i}>
              <td>{h.hospitalName}</td>
              <td>{h.policyName}</td>
              <td>{h.coverageType}</td>
              <td>{h.claimProcessTime} days</td>
              <td>{h.treatmentsCovered?.join(", ") || "N/A"}</td>
              <td>
                <div className="action-buttons">
                  <button
                    className="btn-green"
                    onClick={() => handleGenerateQR(h.hospitalName)}
                  >
                    Generate QR
                  </button>
                  <button
                    className="btn-review"
                    onClick={() => setSelectedHospital(h)}
                  >
                    Give Review
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Review Popup */}
      {selectedHospital && (
        <div className="review-popup">
          <div className="review-card">
            <h3>Give Review for {selectedHospital.hospitalName}</h3>
            <label>⭐ Rating (1–5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
            <label>📝 Comment</label>
            <textarea
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="review-btns">
              <button className="btn-submit" onClick={handleReviewSubmit}>
                Submit
              </button>
              <button
                className="btn-cancel"
                onClick={() => setSelectedHospital(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <a
        href="/chatbot.html"
        target="_blank"
        rel="noopener noreferrer"
        className="support-bot-button"
      >
        💬 Support Bot
      </a>
    </div>
  );
};

export default HospitalList;
