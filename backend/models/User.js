const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  aadhaar: { type: String, required: true },
  
  // 👇 Add this field
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  }
});

module.exports = mongoose.model('User', UserSchema);
