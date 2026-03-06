const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Hospital = require("../models/Hospital");
const Review = require("../models/Review");
const QR = require("../models/qr");
const Policy = require("../models/Policy");

/* ================= USERS ================= */
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({
      success: true,
      users,
    });
  } catch (err) {
    console.error("Admin users error:", err);
    res.status(500).json({
      success: false,
      msg: "Error fetching users",
    });
  }
});

/* ================= HOSPITALS ================= */
router.get("/hospitals", async (req, res) => {
  try {
    const hospitals = await Hospital.find();

    res.json({
      success: true,
      hospitals,
    });
  } catch (err) {
    console.error("Admin hospitals error:", err);
    res.status(500).json({
      success: false,
      msg: "Error fetching hospitals",
    });
  }
});

/* ================= POLICIES ================= */
router.get("/policies", async (req, res) => {
  try {
    const policies = await Policy.find();

    const enrichedPolicies = await Promise.all(
      policies.map(async (policy) => {
        const totalUsers = await User.countDocuments({
          policies: policy._id,
        });

        return {
          ...policy._doc,
          totalUsers,
        };
      })
    );

    res.json({
      success: true,
      policies: enrichedPolicies,
    });
  } catch (err) {
    console.error("Admin policies error:", err);
    res.status(500).json({
      success: false,
      msg: "Error fetching policies",
    });
  }
});

/* ================= REVIEWS ================= */
router.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name email")
      .populate("hospital", "hospitalName address")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      reviews,
    });
  } catch (err) {
    console.error("Admin reviews error:", err);
    res.status(500).json({
      success: false,
      msg: "Error fetching reviews",
    });
  }
});

/* ================= STATS ================= */
router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalHospitals = await Hospital.countDocuments();
    const totalRequests = await QR.countDocuments();

    const pending = await QR.countDocuments({ status: "pending" });
    const completed = await QR.countDocuments({ status: "completed" });
    const approved = await QR.countDocuments({ status: "approved" });

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const monthlyUsers = await User.countDocuments({
      createdAt: { $gte: startOfMonth },
    });

    const monthlyRequests = await QR.countDocuments({
      createdAt: { $gte: startOfMonth },
    });

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalHospitals,
        totalRequests,
        pending,
        completed,
        approved,
        monthlyUsers,
        monthlyRequests,
      },
    });
  } catch (err) {
    console.error("Admin stats error:", err);
    res.status(500).json({
      success: false,
      msg: "Error fetching stats",
    });
  }
});

module.exports = router;