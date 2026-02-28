// frontend/src/App.js

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
import HospitalLogin from "./components/HospitalLogin";       // ✅ new
import HospitalDashboard from "./components/HospitalDashboard"; // ✅ new
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
        {/* Public / user pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/policyentry" element={<PolicyEntry />} />
        <Route path="/hospitals" element={<HospitalList />} />
        <Route path="/qr" element={<QRPage />} />
        <Route path="/treatment" element={<TreatmentPage />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />

        {/* Hospital pages */}
        <Route path="/hospital/login" element={<HospitalLogin />} />          {/* ✅ login */}
        <Route path="/hospital/dashboard" element={<HospitalDashboard />} />  {/* ✅ dashboard */}
        <Route path="/hospital/patient/:qrId" element={<HospitalApprove />} /> {/* ✅ approve/withdraw */}
      </Routes>
    </>
  );
}

export default App;