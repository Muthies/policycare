const express = require("express");
const router = express.Router();
const Hospital = require("../models/Hospital");

/**
 * ==========================================================
 * 🔥 GET NEARBY HOSPITALS (REAL DISTANCE SORTING)
 * Query params:
 * lat, lng, insurance (optional)
 * ==========================================================
 */
router.get("/nearby/search", async (req, res) => {
  try {
    const { lat, lng, insurance } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        message: "Latitude and Longitude are required",
      });
    }

    const hospitals = await Hospital.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [
              parseFloat(lng), // longitude FIRST
              parseFloat(lat), // latitude SECOND
            ],
          },
          distanceField: "distance",
          spherical: true,
        },
      },

      // Optional insurance filter
      ...(insurance
        ? [
            {
              $match: {
                acceptedInsurance: { $in: [insurance] },
              },
            },
          ]
        : []),

      // 🔥 LOOKUP REVIEWS
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "hospital",
          as: "reviews",
        },
      },

      // 🔥 ADD AVG RATING + DISTANCE IN KM
      {
        $addFields: {
          distanceInKm: {
            $round: [{ $divide: ["$distance", 1000] }, 2],
          },
          avgRating: { $avg: "$reviews.rating" },
        },
      },

      // Sort nearest first
      {
        $sort: { distance: 1 },
      },
    ]);

    res.json(hospitals);
  } catch (err) {
    console.error("❌ Geo search error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ==========================================================
 * GET HOSPITALS BY INSURANCE (DEFAULT LISTING)
 * ==========================================================
 */
router.get("/:insurance", async (req, res) => {
  try {
    const insurance = req.params.insurance;

    const hospitals = await Hospital.aggregate([
      {
        $match: {
          acceptedInsurance: { $in: [insurance] },
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "hospital",
          as: "reviews",
        },
      },
      {
        $addFields: {
          avgRating: { $avg: "$reviews.rating" },
        },
      },
    ]);

    res.json(hospitals);
  } catch (err) {
    console.error("❌ Insurance filter error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
