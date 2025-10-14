// frontend/src/components/PolicyEntry.js

import React, { useState } from 'react';
import '../style.css';
import { Link } from 'react-router-dom'; // for navigating to ChatPage

const PolicyEntry = () => {
  const [insurance, setInsurance] = useState("");
  const [policyNo, setPolicyNo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("insurance", insurance);
    localStorage.setItem("policyNo", policyNo);
    window.location.href = "/hospitals";
  };

  const insuranceProviders = [
    "Star Health", "ICICI Lombard", "SBI General", "HDFC ERGO", "Aditya Birla Health",
    "IFFCO Tokio", "Niva Bupa", "Digit Insurance", "Bajaj Allianz", "Reliance Health",
    "Future Generali", "New India Assurance", "Oriental Insurance", "United India Insurance",
    "Tata AIG", "Care Health", "Chola MS", "Liberty General", "Manipal Cigna", "Max Bupa"
  ];

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

        <button type="submit">Submit</button>
      </form>

      
     
    </div>
  );
};

export default PolicyEntry;
