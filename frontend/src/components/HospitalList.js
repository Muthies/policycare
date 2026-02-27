import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style.css";

/* ---------------- STAR RATING ---------------- */
const StarRating = ({ value }) => {
  const rounded = Math.round(value || 0);
  return (
    <span style={{ color: "#FFD700", fontSize: "18px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i}>{i <= rounded ? "★" : "☆"}</span>
      ))}
    </span>
  );
};

const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewTreatment, setReviewTreatment] = useState("");

  const [treatmentFilter, setTreatmentFilter] = useState(
    localStorage.getItem("treatment") || ""
  );

  const [sortMode, setSortMode] = useState("NONE");
  const [loading, setLoading] = useState(false);

  const insurance = localStorage.getItem("insurance");
  const userId = localStorage.getItem("userId");

  /* ---------------- FETCH HOSPITALS BY INSURANCE ---------------- */
  useEffect(() => {
    if (!insurance) return;

    setLoading(true);

    axios
      .get(`https://policycare-backend.onrender.com/api/hospitals/${insurance}`)
      .then((res) => {
        setHospitals(res.data);
        setFilteredHospitals(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [insurance]);

  /* ---------------- FILTER + SORT ---------------- */
  useEffect(() => {
    if (!insurance) return;

    let data = [...hospitals];

    /* ---------- FILTER BY TREATMENT ---------- */
    if (treatmentFilter.trim() !== "") {
      const search = treatmentFilter.toLowerCase();
      data = data.filter((h) =>
        h.treatmentsCovered?.some((t) =>
          t.toLowerCase().includes(search)
        )
      );
    }

    /* ---------- SORT BY RATING ---------- */
    if (sortMode === "RATING") {
      data.sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0));
      setFilteredHospitals(data);
      return;
    }

    /* ---------- SORT BY LOCATION ---------- */
    if (sortMode === "LOCATION") {
      if (!navigator.geolocation) {
        alert("Geolocation not supported by your browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            setLoading(true);

            const res = await axios.get(
              `https://policycare-backend.onrender.com/api/hospitals/nearby/search`,
              {
                params: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                  insurance: insurance,
                },
              }
            );

            let result = res.data;
            console.log("Accuracy (meters):", position.coords.accuracy);

            // Apply treatment filter again
            if (treatmentFilter.trim() !== "") {
              const search = treatmentFilter.toLowerCase();
              result = result.filter((h) =>
                h.treatmentsCovered?.some((t) =>
                  t.toLowerCase().includes(search)
                )
              );
            }

            setFilteredHospitals(result);
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
          }
        },
        () => {
          alert("Location permission denied.");
        }
      );

      return;
    }

    /* ---------- SORT BY BOTH (RATING + DISTANCE) ---------- */
    if (sortMode === "BOTH") {
      if (!navigator.geolocation) {
        alert("Geolocation not supported by your browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        
        async (position) => {
          try {
            setLoading(true);

            const res = await axios.get(
              `https://policycare-backend.onrender.com/api/hospitals/nearby/search`,
              {
                params: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                  insurance: insurance,
                },
              }
            );

            let result = res.data;

            // Apply treatment filter again
            if (treatmentFilter.trim() !== "") {
              const search = treatmentFilter.toLowerCase();
              result = result.filter((h) =>
                h.treatmentsCovered?.some((t) =>
                  t.toLowerCase().includes(search)
                )
              );
            }
           console.log("Latitude:", position.coords.latitude);
console.log("Longitude:", position.coords.longitude);

            // Combine rating + distance
            result.sort((a, b) => {
              const ratingDiff =
                (b.avgRating || 0) - (a.avgRating || 0);
              const distanceDiff =
                (a.distance || 0) - (b.distance || 0);

              return ratingDiff !== 0 ? ratingDiff : distanceDiff;
            });

            setFilteredHospitals(result);
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
          }
        },
        
        () => {
          alert("Location permission denied.");
        }
        
      );

      return;
    }

    /* ---------- DEFAULT ---------- */
    setFilteredHospitals(data);

  }, [hospitals, treatmentFilter, sortMode, insurance]);

  /* ---------------- QR ---------------- */
  const handleGenerateQR = (hospitalName) => {
    localStorage.setItem("hospital", hospitalName);
    window.location.href = "/qr";
  };

  /* ---------------- REVIEW ---------------- */
  const handleReviewSubmit = async () => {
    if (!comment.trim()) return alert("Enter review");
    if (!userId) return alert("Login required");

    try {
      await axios.post("https://policycare-backend.onrender.com/api/reviews", {
        hospitalId: selectedHospital._id,
        userId,
        rating,
        comment,
        treatment: reviewTreatment,
      });

      alert("Review submitted successfully");
      setSelectedHospital(null);
      setComment("");

      const res = await axios.get(
        `https://policycare-backend.onrender.com/api/hospitals/${insurance}`
      );
      setHospitals(res.data);
    } catch {
      alert("Review submission failed");
    }
  };

  return (
    <div className="table-container">
      <h2>Eligible Hospitals</h2>

      <p className="info-text">
        Hospitals are filtered by policy and treatment first.
        Sorting is applied after filtering.
      </p>

      <input
        type="text"
        placeholder="Enter treatment (optional)"
        value={treatmentFilter}
        onChange={(e) => setTreatmentFilter(e.target.value)}
      />

      <div className="sort-buttons">
        <button onClick={() => setSortMode("RATING")}>
          Sort by Rating
        </button>
        <button onClick={() => setSortMode("LOCATION")}>
          Sort by Location
        </button>
        <button onClick={() => setSortMode("BOTH")}>
          Sort by Both
        </button>
      </div>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

      <table>
        <thead>
          <tr>
            <th>Hospital</th>
            <th>Policy</th>
            <th>Claim Days</th>
            <th>Rating</th>
            {(sortMode === "LOCATION" || sortMode === "BOTH") && (
              <th>Distance (KM)</th>
            )}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredHospitals.length ? (
            filteredHospitals.map((h) => (
              <tr key={h._id}>
                <td>{h.hospitalName}</td>
                <td>{h.policyName}</td>
                <td>{h.claimProcessTime} days</td>
                <td>
                  {h.avgRating ? (
                    <>
                      <StarRating value={h.avgRating} />
                      <span style={{ marginLeft: "6px", fontSize: "12px" }}>
                        ({h.avgRating.toFixed(1)})
                      </span>
                    </>
                  ) : (
                    "No reviews"
                  )}
                </td>

                {(sortMode === "LOCATION" || sortMode === "BOTH") && (
                  <td>
                    {h.distanceInKm ? `${h.distanceInKm} km` : "-"}
                  </td>
                )}

                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-green"
                      onClick={() => handleGenerateQR(h.hospitalName)}
                    >
                      QR
                    </button>
                    <button
                      className="btn-review"
                      onClick={() => setSelectedHospital(h)}
                    >
                      Review
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            !loading && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No hospitals found
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      {selectedHospital && (
        <div className="review-popup">
          <div className="review-card">
            <h3>{selectedHospital.hospitalName}</h3>

            <label>Rating</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            />

            <label>Treatment</label>
            <input
              type="text"
              placeholder="Enter treatment"
              value={reviewTreatment}
              onChange={(e) => setReviewTreatment(e.target.value)}
              required
            />

            <label>Comment</label>
            <textarea
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
