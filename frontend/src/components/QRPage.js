// frontend/src/components/QRPage.js

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import axios from "axios";
import "../style.css";

const QRPage = () => {
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    const generateQR = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const hospitalId = localStorage.getItem("hospitalId");

        if (!userId || !hospitalId) {
          alert("User or Hospital not selected properly");
          return;
        }

        // 🔥 Create QR record in backend
        const res = await axios.post(
          "https://policycare-backend.onrender.com/api/qr/create",
          { userId, hospitalId }
        );

        const qrId = res.data.qrId;

        // 🔥 Encode approval URL in QR
        const approvalLink = `https://policycare-backend.onrender.com/hospital/approve/${qrId}`;

        const url = await QRCode.toDataURL(approvalLink);
        setQrUrl(url);

      } catch (error) {
        console.error("QR Generation Error:", error);
      }
    };

    generateQR();
  }, []);

  return (
    <div className="qr-container">
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