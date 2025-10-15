const express = require("express");
const router = express.Router();
const Review = require("../models/review");

// Add a review
router.post("/", async (req, res) => {
  try {
    const { userId, hospitalId, rating, comment } = req.body;

    if (!userId || !hospitalId || !rating) {
      return res.status(400).json({ msg: "User, hospital, and rating are required" });
    }

    const newReview = new Review({
      user: userId,
      hospital: hospitalId,
      rating,
      comment
    });

    await newReview.save();
    res.json({ msg: "Review added successfully", review: newReview });
  } catch (err) {
    console.error("Error adding review:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get all reviews for a hospital
router.get("/:hospitalId", async (req, res) => {
  try {
    const reviews = await Review.find({ hospital: req.params.hospitalId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
