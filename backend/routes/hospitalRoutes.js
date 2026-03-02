const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Hospital = require("../models/Hospital");

/**
 * ==========================================================
 * 🏥 HOSPITAL LOGIN
 * ==========================================================
 */
router.post("/login", async (req, res) => {
  try {
    const { hospitalUsername, password } = req.body;

    if (!hospitalUsername || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const hospital = await Hospital.findOne({ hospitalUsername });

    if (!hospital) {
      return res.status(400).json({
        success: false,
        message: "Hospital not found",
      });
    }

    const isMatch = await bcrypt.compare(password, hospital.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    res.json({
      success: true,
      hospital: {
        _id: hospital._id,
        hospitalName: hospital.hospitalName,
        hospitalUsername: hospital.hospitalUsername,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/**
 * ==========================================================
 * 🔥 GET NEARBY HOSPITALS
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
              parseFloat(lng),
              parseFloat(lat),
            ],
          },
          distanceField: "distance",
          spherical: true,
        },
      },

      ...(insurance
        ? [
            {
              $match: {
                acceptedInsurance: {
                  $elemMatch: {
                    $regex: insurance,
                    $options: "i",
                  },
                },
              },
            },
          ]
        : []),

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
          distanceInKm: {
            $round: [{ $divide: ["$distance", 1000] }, 2],
          },
          avgRating: { $avg: "$reviews.rating" },
        },
      },

      {
        $sort: { distance: 1 },
      },
    ]);

    res.json(hospitals);
  } catch (err) {
    console.error("Geo search error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * ==========================================================
 * GET HOSPITALS BY INSURANCE
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
    console.error("Insurance filter error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;