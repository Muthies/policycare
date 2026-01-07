// server.js
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

// --- Middleware ---
app.use(
  cors({
    origin: '*', // For production, replace with frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
  })
);
app.use(express.json());

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGODB_URI || "your-mongo-uri-here")
  .then(() => console.log("✅ MongoDB Connected to Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// --- Models ---
const User = require("./models/User");
const Hospital = require("./models/Hospital");
const Review = require("./models/review"); // Add this if not already in use

// --------------------- Signup Route ---------------------
app.post("/api/signup", async (req, res) => {
  const { name, email, password, address, state, aadhaar } = req.body;

  // Check all fields
  if (!name || !email || !password || !address || !state || !aadhaar) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  // Aadhaar format validation
  const aadhaarRegex = /^\d{12}$/;
  if (!aadhaarRegex.test(aadhaar)) {
    return res.status(400).json({ msg: "Aadhaar must be 12 digits" });
  }

  try {
    const existEmail = await User.findOne({ email });
    if (existEmail) return res.status(400).json({ msg: "Email already registered" });

    const existAadhaar = await User.findOne({ aadhaar });
    if (existAadhaar) return res.status(400).json({ msg: "Aadhaar already registered" });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashed, address, state, aadhaar, role: "user" });
    await newUser.save();

    res.json({ msg: "Signup successful" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// --------------------- Login Route ---------------------
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password required" });
  }

  try {
    // Admin login
    if (email === "admin@example.com" && password === "admin123") {
      return res.json({
        msg: "Admin login successful",
        userId: "admin",
        name: "Admin",
        role: "admin"
      });
    }

    // Normal user login
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ msg: "Invalid credentials" });

    res.json({
      msg: "Login successful",
      userId: user._id,
      name: user.name,
      role: user.role || "user"
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// --------------------- Get Hospitals by Insurance ---------------------
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

// --------------------- Final Chatbot Route (Gemini API) ---------------------
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "No message provided" });

    const systemPrompt = `
You are a helpful medical information assistant specializing in hospitals and healthcare. 
Provide detailed and structured responses about:
🏥 Hospital names, locations, and specialties
👨‍⚕️ Doctor details including names, specializations, and experience
📞 Contact numbers (realistic formats like +91-XXX-XXX-XXXX)
💊 Treatment options and procedures
⭐ Patient reviews and ratings
💰 Insurance coverage and costs

Be factual, clear, and well-formatted using emojis and bullet points where helpful.
    `;

    const fetchFn = (typeof fetch !== "undefined") ? fetch : (await import('node-fetch')).default;

    const response = await fetchFn(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt + "\n\nUser query: " + message }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API Error:", errorText);
      return res.status(500).json({ error: "Gemini API error: " + errorText });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("❌ Chatbot error:", err);
    res.status(500).json({ error: "Something went wrong: " + err.message });
  }
});

// --------------------- Admin: Get All Hospitals ---------------------
app.get("/api/admin/hospitals", async (req, res) => {
  try {
    const hospitals = await Hospital.find({});
    res.json(hospitals);
  } catch (err) {
    console.error("Error fetching hospitals:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// --------------------- Admin: Get All Reviews ---------------------
app.get("/api/admin/reviews", async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name email")
      .populate("hospital", "hospitalName address");
    res.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// --------------------- Reviews API ---------------------
app.use('/api/reviews', reviewRoutes);

// --------------------- Start Server ---------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
