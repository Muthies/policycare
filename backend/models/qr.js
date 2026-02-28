const mongoose = require("mongoose");

const qrSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "requested", "completed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  approvedAt: Date,

  // ✅ NEW FIELD
  requestDate: {
    type: String, // format: YYYY-MM-DD
    required: true,
  },
});

// ✅ Prevent duplicate same hospital same day
qrSchema.index(
  { userId: 1, hospitalId: 1, requestDate: 1 },
  { unique: true }
);

module.exports = mongoose.model("QR", qrSchema);