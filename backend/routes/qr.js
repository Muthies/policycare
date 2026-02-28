const express = require("express");
const router = express.Router();
const QR = require("../models/qr");
const User = require("../models/User");

/* ==============================
   CREATE QR (Patient Generates)
============================== */
router.post("/create", async (req, res) => {
  try {
    const { userId, hospitalId } = req.body;

    if (!userId || !hospitalId) {
      return res.status(400).json({ message: "UserId and HospitalId required" });
    }

    const qr = await QR.create({
      userId,
      hospitalId,
      status: "pending",   // 🔥 default status
      createdAt: new Date(),
    });

    res.status(201).json({ qrId: qr._id });

  } catch (err) {
    console.error("QR Create Error:", err);
    res.status(500).json({ message: "QR creation failed" });
  }
});

/* ==============================
   SEND REQUEST TO HOSPITAL
============================== */
router.put("/request/:qrId", async (req, res) => {
  try {
    const qr = await QR.findById(req.params.qrId);

    if (!qr) {
      return res.status(404).json({ message: "QR not found" });
    }

    if (qr.status !== "pending") {
      return res.status(400).json({ message: "QR already requested or completed" });
    }

    qr.status = "requested";
    await qr.save();

    res.json({ message: "Request sent to hospital successfully" });

  } catch (err) {
    console.error("QR Request Error:", err);
    res.status(500).json({ message: "Failed to send request" });
  }
});

/* ==============================
   GET PENDING REQUESTS FOR HOSPITAL
============================== */
router.get("/hospital/:hospitalId", async (req, res) => {
  try {
    const requests = await QR.find({
      hospitalId: req.params.hospitalId,
      status: "requested",
    }).populate("userId", "name email aadhaar");

    res.json(requests);

  } catch (err) {
    console.error("Fetch Hospital Requests Error:", err);
    res.status(500).json({ message: "Failed to fetch requests" });
  }
});

/* ==============================
   APPROVE QR (Hospital Approves)
============================== */
router.put("/approve/:qrId", async (req, res) => {
  try {
    const qr = await QR.findById(req.params.qrId);

    if (!qr) {
      return res.status(404).json({ message: "QR not found" });
    }

    if (qr.status === "completed") {
      return res.status(400).json({ message: "Already approved" });
    }

    qr.status = "completed";
    qr.approvedAt = new Date();
    await qr.save();

    // 🔥 Push treatment into user history
    await User.findByIdAndUpdate(qr.userId, {
      $push: {
        treatments: {
          hospitalId: qr.hospitalId,
          qrId: qr._id,
          status: "completed",
          date: new Date(),
        },
      },
    });

    res.json({ message: "Treatment Approved & Updated" });

  } catch (err) {
    console.error("QR Approve Error:", err);
    res.status(500).json({ message: "Approval failed" });
  }
});

module.exports = router;