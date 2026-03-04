// routes/qr.js

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const QR = require("../models/qr");
const User = require("../models/User");
const Hospital = require("../models/Hospital");

/* ==============================
   CREATE OR GET QR (SAFE VERSION)
============================== */
router.post("/create", async (req, res) => {
  try {
    const { userId, hospitalId } = req.body;

    if (!userId || !hospitalId) {
      return res.status(400).json({
        message: "UserId and HospitalId required",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(hospitalId)
    ) {
      return res.status(400).json({
        message: "Invalid ID format",
      });
    }

    // Check hospital exists
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    const today = new Date().toISOString().split("T")[0];

    // 🔥 Check if QR already exists today
    let qr = await QR.findOne({
      userId,
      hospitalId,
      requestDate: today,
    });

    // 🔥 If not exists → create new
    if (!qr) {
      qr = await QR.create({
        userId,
        hospitalId,
        status: "pending",
      });
    }

    // ✅ Always return full QR object
    res.status(200).json(qr);

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
    const { qrId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(qrId)) {
      return res.status(400).json({ message: "Invalid QR ID" });
    }

    const qr = await QR.findById(qrId);
    if (!qr) return res.status(404).json({ message: "QR not found" });

    if (qr.status === "requested") {
      return res.status(400).json({ message: "Already requested" });
    }

    qr.status = "requested";
    await qr.save();

    res.json({ message: "Request sent successfully" });

  } catch (err) {
    console.error("QR Request Error:", err);
    res.status(500).json({ message: "Failed to send request" });
  }
});


/* ==============================
   GET REQUESTS FOR HOSPITAL
============================== */
router.get("/hospital/:hospitalId", async (req, res) => {
  try {
    const { hospitalId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(hospitalId)) {
      return res.status(400).json({ message: "Invalid Hospital ID" });
    }

    const requests = await QR.find({
      hospitalId,
      status: "requested",
    })
      .populate("userId", "name email aadhaar treatments")
      .populate("hospitalId", "hospitalName hospitalUsername");

    res.json(requests);

  } catch (err) {
    console.error("Fetch Hospital Requests Error:", err);
    res.status(500).json({ message: "Failed to fetch requests" });
  }
});


/* ==============================
   GET SINGLE QR
============================== */
router.get("/:qrId", async (req, res) => {
  try {
    const { qrId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(qrId)) {
      return res.status(400).json({ message: "Invalid QR ID" });
    }

    const qr = await QR.findById(qrId)
      .populate("userId", "name email aadhaar treatments")
      .populate("hospitalId", "hospitalName hospitalUsername");

    if (!qr) return res.status(404).json({ message: "QR not found" });

    res.json(qr);

  } catch (err) {
    console.error("Fetch QR Error:", err);
    res.status(500).json({ message: "Failed to fetch QR" });
  }
});


/* ==============================
   APPROVE QR
============================== */
router.put("/approve/:qrId", async (req, res) => {
  try {
    const { qrId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(qrId)) {
      return res.status(400).json({ message: "Invalid QR ID" });
    }

    const qr = await QR.findById(qrId);
    if (!qr) return res.status(404).json({ message: "QR not found" });

    qr.status = "completed";
    qr.approvedAt = new Date();
    await qr.save();

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


/* ==============================
   WITHDRAW QR
============================== */
router.put("/withdraw/:qrId", async (req, res) => {
  try {
    const { qrId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(qrId)) {
      return res.status(400).json({ message: "Invalid QR ID" });
    }

    const qr = await QR.findById(qrId);
    if (!qr) return res.status(404).json({ message: "QR not found" });

    qr.status = "pending";
    await qr.save();

    res.json({ message: "Request Withdrawn" });

  } catch (err) {
    console.error("QR Withdraw Error:", err);
    res.status(500).json({ message: "Failed to withdraw" });
  }
});

module.exports = router;