import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PolicyEntry from "./components/PolicyEntry";
import HospitalList from "./components/HospitalList";
import QRPage from "./components/QRPage";
import TreatmentPage from "./components/TreatmentPage";
import AdminDashboard from "./components/AdminDashboard";
import HospitalApprove from "./components/HospitalApprove";

function App() {
  return (
    <>
      {/* Header */}
      <header className="landing-header">
        <h1 className="app-title">PolicyCare</h1>
        <p className="app-subtitle">
          Welcome to PolicyCare – Simplifying your insurance & hospital management!
        </p>
      </header>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/policyentry" element={<PolicyEntry />} />
        <Route path="/hospitals" element={<HospitalList />} />
        <Route path="/qr" element={<QRPage />} />
        <Route path="/treatment" element={<TreatmentPage />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/hospital/approve/:qrId" element={<HospitalApprove />} />
      </Routes>
    </>
  );
}

export default App;
