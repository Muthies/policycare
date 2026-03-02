const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },

    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true,
      trim: true 
    },

    password: { 
      type: String, 
      required: true 
    },

    address: { 
      type: String, 
      required: true 
    },

    state: { 
      type: String, 
      required: true 
    },

    aadhaar: { 
      type: String, 
      required: true 
    },

    role: { 
      type: String, 
      enum: ["user", "admin"], 
      default: "user" 
    },

    // 🔹 Treatment History
    treatments: [
      {
        hospitalId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Hospital"
        },
        qrId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "QR"
        },
        status: {
          type: String,
          default: "completed"
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);