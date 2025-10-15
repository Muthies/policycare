const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  user: { type: String, required: true },        // user name or ID
  hospital: { type: String, required: true },    // hospital name
  rating: { type: Number, required: true },      // rating 1-5
  comment: { type: String }                      // optional comment
}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);
