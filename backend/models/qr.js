const mongoose = require("mongoose");

const qrSchema = new mongoose.Schema(
  {
    /* ================= USER ================= */
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    /* ================= HOSPITAL ================= */
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    /* ================= STATUS ================= */
    status: {
      type: String,
      enum: ["pending", "approved", "completed"],
      default: "pending",
    },

    /* ================= APPROVAL DATE ================= */
    approvedAt: {
      type: Date,
    },

    /* ================= COMPLETION DATE ================= */
    completedAt: {
      type: Date,
    },

    /* ================= DAILY LIMIT TRACK ================= */
    requestDate: {
      type: String,
      default: () => new Date().toISOString().split("T")[0], // YYYY-MM-DD
    },
  },
  { timestamps: true }
);

/* 🔥 Prevent duplicate request same hospital same day */
qrSchema.index(
  { userId: 1, hospitalId: 1, requestDate: 1 },
  { unique: true }
);

module.exports = mongoose.model("QR", qrSchema);