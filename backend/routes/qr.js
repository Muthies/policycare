// routes/qr.js

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
    let { userId, hospitalUsername } = req.body;

    if (!userId || !hospitalUsername) {
      return res.status(400).json({ message: "UserId and Hospital Username required" });
    }

    hospitalUsername = hospitalUsername.trim(); // trim spaces to match DB

    // Check valid ObjectId for user
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID format" });
    }

    // Create QR
    const qr = new QR({
      userId,
      hospitalUsername,
      status: "pending",
      createdAt: new Date(),
      // requestDate auto-generated in schema
    });

    await qr.save();

    res.status(201).json({ qrId: qr._id });

  } catch (err) {
    // Duplicate request for same hospital same day
    if (err.code === 11000) {
      return res.status(400).json({
        message: "You have already requested this hospital today",
      });
    }

    console.error("QR Create Error FULL:", err);
    res.status(500).json({ message: "QR creation failed" });
  }
});

/* ==============================
   SEND REQUEST TO HOSPITAL
============================= */
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
============================= */
router.get("/hospital/:hospitalUsername", async (req, res) => {
  try {
    let { hospitalUsername } = req.params;
    hospitalUsername = hospitalUsername.trim(); // trim to match DB

    // Fetch only requested QRs
    const requests = await QR.find({ hospitalUsername, status: "requested" })
      .populate("userId", "name email aadhaar treatments");

    res.json(requests);
  } catch (err) {
    console.error("Fetch Hospital Requests Error:", err);
    res.status(500).json({ message: "Failed to fetch requests" });
  }
});

/* ==============================
   GET SINGLE QR BY ID
============================= */
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
============================= */
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

    // Add treatment to user record
    await User.findByIdAndUpdate(qr.userId, {
      $push: {
        treatments: {
          hospitalUsername: qr.hospitalUsername,
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
   WITHDRAW QR REQUEST
============================= */
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