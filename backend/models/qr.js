const mongoose = require("mongoose");

const qrSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // ✅ Use STRING (same as Hospital login hospitalId)
  hospitalId: {
    type: String,
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

  requestDate: {
  type: String,
  default: () => new Date().toISOString().split("T")[0],
},
});

// prevent same hospital same day
qrSchema.index(
  { userId: 1, hospitalId: 1, requestDate: 1 },
  { unique: true }
);

module.exports = mongoose.model("QR", qrSchema);