import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PolicyEntry from "./components/PolicyEntry";
import HospitalList from "./components/HospitalList";
import QRPage from "./components/QRPage";
import TreatmentPage from "./components/TreatmentPage";
import AdminDashboard from "./components/AdminDashboard";



function App() {
  return (
    <div>
      {/* Header / Landing Section */}
      <header className="landing-header">
        <h1 className="app-title">PolicyCare</h1>
        <p className="app-subtitle">Welcome to PolicyCare – Simplifying your insurance & hospital management!</p>
      </header>

      {/* Render Login or Signup based on route */}
    

      {/* Router */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/policyentry" element={<PolicyEntry />} />
          <Route path="/hospitals" element={<HospitalList />} />
          <Route path="/qr" element={<QRPage />} />
          <Route path="/treatment" element={<TreatmentPage />} />
<Route path="/admindashboard" element={<AdminDashboard/>} />

          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
