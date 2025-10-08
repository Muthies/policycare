const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
  hospitalName: String,
  policyName: String,
  coverageType: String,
  sumInsured: Number,
  annualPremium: Number,
  claimProcessTime: String,
  insuranceProvider: String
});

module.exports = mongoose.model('Hospital', HospitalSchema);
