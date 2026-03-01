// models/qr.js

const mongoose = require("mongoose");

const qrSchema = new mongoose.Schema({
  // 🔹 User reference
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // 🔹 Hospital username as string (matches hospital login)
  hospitalUsername: {
    type: String,
    required: true,
  },

  // 🔹 Status of QR
  status: {
    type: String,
    enum: ["pending", "requested", "completed"],
    default: "pending",
  },

  // 🔹 QR creation date
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // 🔹 Approval date (filled when approved)
  approvedAt: Date,

  // 🔹 Request date for "one request per hospital per day"
  requestDate: {
    type: String,
    default: () => new Date().toISOString().split("T")[0], // YYYY-MM-DD
  },
});

// 🔹 Prevent duplicate requests for same hospital same day by same user
qrSchema.index(
  { userId: 1, hospitalUsername: 1, requestDate: 1 },
  { unique: true }
);

module.exports = mongoose.model("QR", qrSchema);