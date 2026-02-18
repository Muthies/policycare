const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    // 🔹 User who submitted review
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🔹 Hospital being reviewed
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    // 🔹 Treatment name
    treatment: {
      type: String,
      required: true,
      trim: true,
    },

    // 🔹 Rating (1 to 5 only)
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    // 🔹 Optional comment
    comment: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

/**
 * 🔥 Prevent duplicate review by same user
 * for same hospital + same treatment
 */
reviewSchema.index(
  { user: 1, hospital: 1, treatment: 1 },
  { unique: true }
);

module.exports = mongoose.model("review", reviewSchema);
