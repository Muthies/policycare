require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://22csec03_db_user:IPPqLpSUe0LurJkk@cluster0.30lj2xn.mongodb.net/policycare?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ MongoDB Connected to Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Models
const User = require("./models/User");
const Hospital = require("./models/Hospital");

// --------------------- Signup ---------------------
app.post("/api/signup", async (req, res) => {
  const { name, email, password, address, state, aadhaar } = req.body;

  if (!name || !email || !password || !address || !state || !aadhaar) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
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

// --------------------- Chatbot with Gemini ---------------------
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

    // Using native fetch (Node.js 18+)
    const response = await fetch(
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

// --------------------- Start Server ---------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));