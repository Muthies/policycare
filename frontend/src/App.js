import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PolicyEntry from "./components/PolicyEntry";
import HospitalList from "./components/HospitalList";
import QRPage from "./components/QRPage";
import TreatmentPage from "./components/TreatmentPage";




function App() {
  return (
    <div>
      {/* Header / Landing Section */}
      <header
        className="landing-header"
        style={{
          padding: 20,
          textAlign: "center",
          backgroundColor: "#f0f2f5"
        }}
      >
        <h1
          className="app-title"
          style={{ margin: 0, fontSize: "2em", color: "#007bff" }}
        >
          PolicyCare
        </h1>
        <p
          className="app-subtitle"
          style={{ marginTop: 5, fontSize: "1em", color: "#555" }}
        >
          Welcome to PolicyCare – Simplifying your insurance & hospital management!
        </p>
      </header>

      {/* Router */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/policyentry" element={<PolicyEntry />} />
          <Route path="/hospitals" element={<HospitalList />} />
          <Route path="/qr" element={<QRPage />} />
          <Route path="/treatment" element={<TreatmentPage />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
