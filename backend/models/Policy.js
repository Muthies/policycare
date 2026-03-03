const mongoose = require("mongoose");

const policySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    coverageAmount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Policy", policySchema);