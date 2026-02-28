const express = require("express");
const router = express.Router();
const User = require("../models/User");

/* =====================================
   GET USER PROFILE
   GET /api/users/:userId
===================================== */
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate("treatments.hospitalId", "hospitalName");

    if (!user) {
      return res.status(404).json({ message: "No profile found" });
    }

    res.json(user);
  } catch (error) {
    console.error("User Fetch Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* =====================================
   UPDATE USER PROFILE
   PUT /api/users/:userId
===================================== */
router.put("/:userId", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("User Update Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;