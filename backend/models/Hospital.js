const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
  hospitalName: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  insuranceProvider: { type: String, required: true },
  policyName: { type: String, required: true },
  coverageType: { type: String, required: true },
  cashlessAvailable: { type: String, default: "Yes" },
  maxClaimAmount: { type: Number, required: true },
  claimProcessTime: { type: Number, required: true },
  treatmentsCovered: { type: [String], required: true }
});

// For geospatial queries
HospitalSchema.index({ location: "2dsphere" });

module.exports = mongoose.model('Hospital', HospitalSchema);
