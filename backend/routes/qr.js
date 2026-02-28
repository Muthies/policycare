const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const QR = require("../models/qr");   // QR model
const User = require("../models/User");

/* ==============================
   CREATE QR
============================== */
router.post("/create", async (req, res) => {
  try {
    const { userId, hospitalId } = req.body;

    if (!userId || !hospitalId) {
      return res.status(400).json({ message: "UserId and HospitalId required" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID format" });
    }

    const qr = new QR({
      userId,
      hospitalId,
      status: "pending",
      createdAt: new Date(),
    });

    await qr.save();

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
    const { qrId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(qrId)) {
      return res.status(400).json({ message: "Invalid QR ID" });
    }

    const qr = await QR.findById(qrId);
    if (!qr) return res.status(404).json({ message: "QR not found" });

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

    const requests = await QR.find({ hospitalId, status: "requested" })
      .populate("userId", "name email aadhaar treatments");

    res.json(requests);
  } catch (err) {
    console.error("Fetch Hospital Requests Error:", err);
    res.status(500).json({ message: "Failed to fetch requests" });
  }
});

/* ==============================
   GET SINGLE QR BY ID
============================== */
router.get("/:qrId", async (req, res) => {
  try {
    const { qrId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(qrId)) {
      return res.status(400).json({ message: "Invalid QR ID" });
    }

    const qr = await QR.findById(qrId)
      .populate("userId", "name email aadhaar treatments");

    if (!qr) return res.status(404).json({ message: "QR not found" });

    res.json(qr);
  } catch (err) {
    console.error("Fetch QR by ID Error:", err);
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
   WITHDRAW QR REQUEST (optional)
============================== */
router.put("/withdraw/:qrId", async (req, res) => {
  try {
    const { qrId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(qrId)) {
      return res.status(400).json({ message: "Invalid QR ID" });
    }

    const qr = await QR.findById(qrId);
    if (!qr) return res.status(404).json({ message: "QR not found" });

    qr.status = "withdrawn";
    await qr.save();

    res.json({ message: "Request Withdrawn" });
  } catch (err) {
    console.error("QR Withdraw Error:", err);
    res.status(500).json({ message: "Failed to withdraw" });
  }
});

module.exports = router;