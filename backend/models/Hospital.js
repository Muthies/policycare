const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema(
  {
    hospitalName: {
      type: String,
      required: true,
      trim: true,
    },

    // 🔥 Login credentials (UPDATED)
    hospitalUsername: {
      type: String,
      required: true,
      unique: true, // must be unique
      trim: true,
      lowercase: true, // prevents duplicate like Apollo / apollo
    },

    password: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    // 🌍 GEOJSON LOCATION (REQUIRED FOR $geoNear)
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        required: true,
      },
      coordinates: {
        type: [Number], // MUST be [longitude, latitude]
        required: true,
        validate: {
          validator: function (value) {
            return value.length === 2;
          },
          message:
            "Coordinates must contain exactly [longitude, latitude]",
        },
      },
    },

    acceptedInsurance: {
      type: [String],
      required: true,
    },

    policyName: {
      type: String,
      required: true,
    },

    coverageType: {
      type: String,
      required: true,
    },

    cashlessAvailable: {
      type: String,
      enum: ["Yes", "No"],
      default: "Yes",
    },

    maxClaimAmount: {
      type: Number,
      default: 0,
    },

    claimProcessTime: {
      type: Number,
      required: true,
    },

    treatmentsCovered: {
      type: [String],
      required: true,
    },

    // ⭐ Treatment-based Ratings
    treatmentRatings: [
      {
        treatment: {
          type: String,
          required: true,
        },
        avgRating: {
          type: Number,
          default: 0,
        },
        totalReviews: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// 🔥 Geo index
HospitalSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Hospital", HospitalSchema);