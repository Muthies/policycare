const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const Hospital = require("../models/Hospital");

/**
 * SUBMIT REVIEW
 */
router.post("/", async (req, res) => {
  try {
    const { hospitalId, userId, rating, comment, treatment } = req.body;

    if (!hospitalId || !userId || !rating || !treatment) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Save review
    const review = new Review({
      hospital: hospitalId,
      user: userId,
      rating,
      comment,
      treatment,
    });

    await review.save();

    // Update hospital treatmentRatings
    const hospital = await Hospital.findById(hospitalId);

    if (!hospital) {
      return res.status(404).json({
        message: "Hospital not found",
      });
    }

    const index = hospital.treatmentRatings.findIndex(
      (t) => t.treatment === treatment
    );

    if (index !== -1) {
      const existing = hospital.treatmentRatings[index];

      const newTotal = existing.totalReviews + 1;
      const newAvg =
        (existing.avgRating * existing.totalReviews + rating) /
        newTotal;

      hospital.treatmentRatings[index].avgRating = newAvg;
      hospital.treatmentRatings[index].totalReviews = newTotal;
    } else {
      hospital.treatmentRatings.push({
        treatment,
        avgRating: rating,
        totalReviews: 1,
      });
    }

    await hospital.save();

    res.status(201).json({
      message: "Review submitted successfully",
    });

  } catch (err) {
    console.error("❌ Review error:", err);
    res.status(500).json({
      message: "Review submission failed",
      error: err.message,
    });
  }
});

module.exports = router;
