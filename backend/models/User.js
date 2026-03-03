const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    aadhaar: {
      type: String,
      required: true,
      unique: true,
      match: /^\d{12}$/, // must be 12 digits
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    /* ================= POLICIES ================= */
    policies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Policy",
      },
    ],

    /* ================= TREATMENT HISTORY ================= */
    treatments: [
      {
        hospitalId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Hospital",
        },
        qrId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "QR",
        },
        status: {
          type: String,
          enum: ["pending", "approved", "completed"],
          default: "completed",
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);