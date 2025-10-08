const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/policycare", {
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Models
const User = require("./models/User");
const Hospital = require("./models/Hospital");

// --------------------- Signup ---------------------
app.post("/api/signup", async (req, res) => {
  const { name, email, password, address, state, aadhaar } = req.body;

  // Basic validation
  if (!name || !email || !password || !address || !state || !aadhaar) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    // Check if user already exists
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ msg: "User already exists" });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new User({ name, email, password: hashed, address, state, aadhaar });
    await newUser.save();

    res.json({ msg: "Signup successful" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// --------------------- Login ---------------------
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ msg: "Email and password required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ msg: "Invalid credentials" });

    res.json({ msg: "Login successful", userId: user._id, name: user.name });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// --------------------- Get Hospitals ---------------------
app.get("/api/hospitals/:insurance", async (req, res) => {
  const { insurance } = req.params;
  try {
    const hospitals = await Hospital.find({ insuranceProvider: insurance });
    res.json(hospitals);
  } catch (err) {
    console.error("Hospital fetch error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// --------------------- Start Server ---------------------
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
