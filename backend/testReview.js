const express = require("express");
const router = express.Router();
const Review = require("../models/review"); // <-- correct path

// Add review
router.post("/", async (req, res) => {
  const { userId, hospitalId, rating, comment } = req.body;

  if (!userId || !hospitalId || !rating) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const review = new Review({ user: userId, hospital: hospitalId, rating, comment });
    await review.save();
    res.json({ msg: "Review added successfully", review });
  } catch (err) {
    console.error("Error adding review:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
