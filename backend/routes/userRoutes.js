const express = require("express");
const router = express.Router();
const User = require("../models/User");

/* ==============================
   GET USER PROFILE
============================== */
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate("treatments.hospitalId", "hospitalName");

    if (!user) return res.status(404).json(null);

    res.json(user);
  } catch (err) {
    console.error("User Fetch Error:", err);
    res.status(500).json(null);
  }
});

module.exports = router;