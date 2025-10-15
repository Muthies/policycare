// frontend/src/components/PolicyEntry.js
import React, { useState } from 'react';
import '../style.css';
import { useNavigate } from 'react-router-dom'; // better than window.location.href

const PolicyEntry = () => {
  const navigate = useNavigate();
  const [insurance, setInsurance] = useState("");
  const [policyNo, setPolicyNo] = useState("");
  const [treatment, setTreatment] = useState("");
  const [error, setError] = useState("");

  const insuranceProviders = [
    "Star Health", "ICICI Lombard", "SBI General", "HDFC ERGO", "Aditya Birla Health",
    "IFFCO Tokio", "Niva Bupa", "Digit Insurance", "Bajaj Allianz", "Reliance Health",
    "Future Generali", "New India Assurance", "Oriental Insurance", "United India Insurance",
    "Tata AIG", "Care Health", "Chola MS", "Liberty General", "Manipal Cigna", "Max Bupa"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check Star Health policy number length
    if (insurance === "Star Health" && policyNo.length !== 10) {
      setError("Star Health policy number must be 10 digits");
      return;
    }

    // Save to localStorage for hospitals page
    localStorage.setItem("insurance", insurance);
    localStorage.setItem("policyNo", policyNo);
    localStorage.setItem("treatment", treatment);

    // Navigate to hospitals page
    navigate("/hospitals");
  };

  return (
    <div className="form-container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Enter Policy Details</h2>

        <select
          value={insurance}
          onChange={(e) => setInsurance(e.target.value)}
          required
        >
          <option value="">Select Insurance Provider</option>
          {insuranceProviders.map((ins) => (
            <option key={ins} value={ins}>{ins}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Policy Number"
          value={policyNo}
          onChange={(e) => setPolicyNo(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Treatment (optional)"
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
        />

        {error && <p className="error-msg">{error}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PolicyEntry;
