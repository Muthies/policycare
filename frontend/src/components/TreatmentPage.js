// frontend/src/components/TreatmentPage.js
import React from 'react';
import '../style.css';

const TreatmentPage = () => {
  const hospital = localStorage.getItem("hospital");
  const insurance = localStorage.getItem("insurance");
  const policyNo = localStorage.getItem("policyNo");
  const name = localStorage.getItem("name");

  return (
    <div className="treatment-container">
      <h2>Treatment Details</h2>
      <div className="treatment-card">
        <p><strong>Patient Name:</strong> {name}</p>
        <p><strong>Hospital:</strong> {hospital}</p>
        <p><strong>Insurance Provider:</strong> {insurance}</p>
        <p><strong>Policy Number:</strong> {policyNo}</p>
        <p>This page can display treatment details, policy coverage info, and claim status.</p>
      </div>
    </div>
  );
};

export default TreatmentPage;
