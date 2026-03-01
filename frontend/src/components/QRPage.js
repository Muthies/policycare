// frontend/src/components/QRPage.js

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import axios from "axios";
import "../style.css";

const QRPage = () => {
  const [qrUrl, setQrUrl] = useState("");
  const [qrId, setQrId] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const generateQR = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const hospitalUsername = localStorage.getItem("hospitalUsername"); // ✅ use hospitalUsername

        if (!userId || !hospitalUsername) {
          alert("User or Hospital not selected properly");
          return;
        }

        const res = await axios.post(
          "https://policycare-backend.onrender.com/api/qr/create",
          { userId, hospitalUsername } // ✅ send hospitalUsername
        );

        const generatedQrId = res.data.qrId;
        setQrId(generatedQrId);

        const approvalLink = `${window.location.origin}/hospital/approve/${generatedQrId}`;
        const url = await QRCode.toDataURL(approvalLink);
        setQrUrl(url);

      } catch (error) {
        if (error.response && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          console.error("QR Generation Error:", error);
          alert("Failed to generate QR");
        }
      }
    };
    generateQR();
  }, []);

  // 🔥 Send to Hospital
  const handleSendToHospital = async () => {
    try {
      await axios.put(
        `https://policycare-backend.onrender.com/api/qr/request/${qrId}`
      );

      setSent(true);
      alert("Request sent to hospital successfully");
    } catch (error) {
      console.error("Send Error:", error);
      alert("Failed to send request");
    }
  };

  return (
    <div className="qr-container" style={{ position: "relative" }}>
      {qrUrl && !sent && (
        <button onClick={handleSendToHospital} className="send-btn">
          Send to Hospital
        </button>
      )}

      <h2>Your Treatment QR Code</h2>

      {qrUrl ? (
        <img src={qrUrl} alt="QR Code" className="qr-image" />
      ) : (
        <p>Generating QR...</p>
      )}

      {qrUrl && (
        <a href={qrUrl} download="treatment_qr.png" className="btn-download">
          Download QR
        </a>
      )}
    </div>
  );
};

export default QRPage;