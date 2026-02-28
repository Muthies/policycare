import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const HospitalApprove = () => {
  const { qrId } = useParams();
  const [message, setMessage] = useState("Approving...");

  useEffect(() => {
    const approveQR = async () => {
      try {
        const res = await axios.put(
          `https://policycare-backend.onrender.com/api/qr/approve/${qrId}`
        );

        setMessage(res.data.message);
      } catch (error) {
        console.error(error);
        setMessage("Approval failed");
      }
    };

    approveQR();
  }, [qrId]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>{message}</h2>
    </div>
  );
};

export default HospitalApprove;