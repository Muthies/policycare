// frontend/src/components/QRPage.js

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style.css";

const QRPage = () => {
  const [qrUrl, setQrUrl] = useState("");
  const [qrId, setQrId] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const generateQR = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const hospitalId = localStorage.getItem("hospitalId");

        // ✅ Safety Validation
        if (!userId) {
          alert("Please login first");
          navigate("/login");
          return;
        }

        if (!hospitalId) {
          alert("Please select hospital first");
          navigate("/hospitals");
          return;
        }

        // ✅ Create or get existing QR
        const res = await axios.post(
          "https://policycare-backend.onrender.com/api/qr/create",
          { userId, hospitalId }
        );

        // 🔥 IMPORTANT: Backend now returns full QR object
        const generatedQrId = res.data._id;

        if (!generatedQrId) {
          alert("QR generation failed");
          return;
        }

        setQrId(generatedQrId);

        // If already requested earlier
        if (res.data.status === "requested") {
          setSent(true);
        }

        // ✅ Generate QR image
        const approvalLink = `${window.location.origin}/hospital/approve/${generatedQrId}`;
        const qrImage = await QRCode.toDataURL(approvalLink);

        setQrUrl(qrImage);
        setLoading(false);

      } catch (error) {
        setLoading(false);

        if (error.response?.data?.message) {
          alert(error.response.data.message);
        } else {
          console.error("QR Generation Error:", error);
          alert("QR generation failed");
        }
      }
    };

    generateQR();
  }, [navigate]);

  // ✅ Send Request to Hospital
  const handleSendToHospital = async () => {
    try {
      if (!qrId) {
        alert("QR not generated properly");
        return;
      }

      const res = await axios.put(
        `https://policycare-backend.onrender.com/api/qr/request/${qrId}`
      );

      setSent(true);
      alert(res.data.message || "Request sent successfully to hospital");

    } catch (error) {
      console.error("Send Error:", error);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Failed to send request");
      }
    }
  };

  return (
    <div className="qr-container">
      <h2>Your Treatment QR Code</h2>

      {loading && <p>Generating QR...</p>}

      {!loading && qrUrl && (
        <>
          {!sent && (
            <button onClick={handleSendToHospital} className="send-btn">
              Send to Hospital
            </button>
          )}

          {sent && (
            <p style={{ color: "green", fontWeight: "bold" }}>
              Request Sent to Hospital ✅
            </p>
          )}

          <img src={qrUrl} alt="QR Code" className="qr-image" />

          <a href={qrUrl} download="treatment_qr.png" className="btn-download">
            Download QR
          </a>
        </>
      )}
    </div>
  );
};

export default QRPage;