// frontend/src/components/QRPage.js
import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import '../style.css';

const QRPage = () => {
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    const data = {
      name: localStorage.getItem("name"),
      aadhaar: localStorage.getItem("aadhaar"),
      insurance: localStorage.getItem("insurance"),
      policyNo: localStorage.getItem("policyNo"),
      hospital: localStorage.getItem("hospital")
    };

    QRCode.toDataURL(JSON.stringify(data))
      .then(url => setQrUrl(url))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="qr-container">
      <h2>Your QR Code</h2>
      {qrUrl ? (
        <img src={qrUrl} alt="QR Code" className="qr-image" />
      ) : (
        <p>Generating QR...</p>
      )}
      {qrUrl && (
        <a href={qrUrl} download="policy_qr.png" className="btn-download">
          Download QR
        </a>
      )}
    </div>
  );
};

export default QRPage;
