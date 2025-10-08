// frontend/src/components/HospitalList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style.css';

const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);
  const insurance = localStorage.getItem("insurance");

  useEffect(() => {
    if (insurance) {
      axios.get(`http://localhost:5000/api/hospitals/${insurance}`)
        .then(res => setHospitals(res.data))
        .catch(err => console.log(err));
    }
  }, [insurance]);

  const handleGenerateQR = (hospitalName) => {
    localStorage.setItem("hospital", hospitalName);
    window.location.href = "/qr";
  };

  return (
    <div className="table-container">
      <h2>Hospitals</h2>
      <table className="hospital-table">
        <thead>
          <tr>
            {["Hospital Name","Policy Name","Coverage Type","Claim Days","Treatments","Action"].map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hospitals.map((h, i) => (
            <tr key={i}>
              <td>{h.hospitalName}</td>
              <td>{h.policyName}</td>
              <td>{h.coverageType}</td>
              <td>{h.claimProcessTime} days</td>
              <td>{h.treatmentsCovered ? h.treatmentsCovered.join(", ") : "N/A"}</td>
              <td>
                <button className="btn-green" onClick={() => handleGenerateQR(h.hospitalName)}>
                  Generate QR
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HospitalList;
