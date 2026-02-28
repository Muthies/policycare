const mongoose = require("mongoose");

const qrSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hospitalId: {
    type: String,  // ✅ changed to string to match frontend "aravind"
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
});

module.exports = mongoose.model("QR", qrSchema);