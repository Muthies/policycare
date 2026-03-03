require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

// Routes
const reviewRoutes = require("./routes/reviewRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Models
const User = require("./models/User");
const Hospital = require("./models/Hospital");
const Review = require("./models/Review");

const app = express();

/* ===================== MIDDLEWARE ===================== */
app.use(
  cors({
    origin: "http://localhost:3000", // allow your React frontend only
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // if you plan to use cookies
  })
);

app.use(express.json());


/* ===================== DATABASE ===================== */
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Stop server if DB fails
  });

/* ===================== HEALTH CHECK ===================== */
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

/* ===================== ROUTES ===================== */
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/qr", require("./routes/qr"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

/* ===================== AUTH ===================== */

// ✅ Signup
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password, address, state, aadhaar } = req.body;

    if (!name || !email || !password || !address || !state || !aadhaar) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    if (!/^\d{12}$/.test(aadhaar)) {
      return res.status(400).json({ msg: "Aadhaar must be 12 digits" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return res.status(400).json({ msg: "Email already registered" });

    const existingAadhaar = await User.findOne({ aadhaar });
    if (existingAadhaar)
      return res.status(400).json({ msg: "Aadhaar already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      address,
      state,
      aadhaar,
      role: "user",
    });

    await newUser.save();

    res.status(201).json({ msg: "Signup successful" });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ msg: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid credentials" });

    res.json({
      msg: "Login successful",
      userId: user._id,
      name: user.name,
      role: user.role,
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});
app.post("/api/hospital/login", async (req, res) => {
  try {
    const { hospitalUsername, password } = req.body;

    if (!hospitalUsername || !password) {
      return res.status(400).json({
        success: false,
        msg: "Username and password required",
      });
    }

    const hospital = await Hospital.findOne({ hospitalUsername });

    if (!hospital) {
      return res.status(400).json({
        success: false,
        msg: "Hospital not found",
      });
    }

    const isMatch = await bcrypt.compare(password, hospital.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        msg: "Invalid password",
      });
    }

    res.json({
      success: true,
      hospital: {
        _id: hospital._id,
        hospitalName: hospital.hospitalName,
        hospitalUsername: hospital.hospitalUsername,
      },
    });

  } catch (err) {
    console.error("Hospital login error:", err.message);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});
/* ===================== CHATBOT ===================== */
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message)
      return res.status(400).json({ error: "Message required" });

    const fetchFn =
      typeof fetch !== "undefined"
        ? fetch
        : (await import("node-fetch")).default;

    const geminiRes = await fetchFn(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a helpful medical assistant. Respond clearly and safely.\n\nUser: ${message}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
          },
        }),
      }
    );

    if (!geminiRes.ok) {
      const errorText = await geminiRes.text();
      console.error("Gemini API error:", errorText);
      return res.status(500).json({ error: "Gemini API error" });
    }

    const data = await geminiRes.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated.";

    res.json({ reply });
  } catch (err) {
    console.error("Chatbot error:", err.message);
    res.status(500).json({ error: "Chatbot failed" });
  }
});

/* ===================== ADMIN ===================== */



/* ===================== START SERVER ===================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});