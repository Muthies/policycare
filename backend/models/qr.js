// models/qr.js

const mongoose = require("mongoose");

const qrSchema = new mongoose.Schema(
  {
    // 🔹 User reference
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🔹 Hospital reference (USE ObjectId, NOT username)
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    // 🔹 Status of QR
    status: {
      type: String,
      enum: ["pending", "requested", "completed"],
      default: "pending",
    },

    // 🔹 Approval date (when hospital approves)
    approvedAt: {
      type: Date,
    },

    // 🔹 Request date (for one request per hospital per day rule)
    requestDate: {
      type: String,
      default: () => new Date().toISOString().split("T")[0], // YYYY-MM-DD
    },
  },
  { timestamps: true } // automatically adds createdAt & updatedAt
);

// 🔥 Prevent duplicate request for same hospital same day by same user
qrSchema.index(
  { userId: 1, hospitalId: 1, requestDate: 1 },
  { unique: true }
);

module.exports = mongoose.model("QR", qrSchema);
