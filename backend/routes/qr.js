const express = require("express");
const router = express.Router();
const QR = require("../models/qr");
const User = require("../models/User");

/* ==============================
   CREATE QR
============================== */
router.post("/create", async (req, res) => {
  try {
    const { userId, hospitalId } = req.body;

    const qr = await QR.create({
      userId,
      hospitalId,
    });

    res.json({ qrId: qr._id });
  } catch (err) {
    res.status(500).json({ message: "QR creation failed" });
  }
});

/* ==============================
   APPROVE QR (Hospital)
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
    console.error(err);
    res.status(500).json({ message: "Approval failed" });
  }
});

module.exports = router;