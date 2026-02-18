require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

// Routes
const reviewRoutes = require("./routes/reviewRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");

// Models
const User = require("./models/User");
const Hospital = require("./models/Hospital");
const Review = require("./models/Review");

const app = express();

/* ===================== MIDDLEWARE ===================== */
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

/* ===================== HEALTH CHECK ===================== */
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

/* ===================== DATABASE ===================== */
mongoose
  .connect(process.env.MONGODB_URI || process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

/* ===================== ROUTES ===================== */

// Hospitals
app.use("/api/hospitals", hospitalRoutes);

// Reviews
app.use("/api/reviews", reviewRoutes);

/* ===================== AUTH ===================== */

// Signup
app.post("/api/signup", async (req, res) => {
  const { name, email, password, address, state, aadhaar } = req.body;

  if (!name || !email || !password || !address || !state || !aadhaar) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  if (!/^\d{12}$/.test(aadhaar)) {
    return res.status(400).json({ msg: "Aadhaar must be 12 digits" });
  }

  try {
    if (await User.findOne({ email }))
      return res.status(400).json({ msg: "Email already registered" });

    if (await User.findOne({ aadhaar }))
      return res.status(400).json({ msg: "Aadhaar already registered" });

    const hashed = await bcrypt.hash(password, 10);

    await new User({
      name,
      email,
      password: hashed,
      address,
      state,
      aadhaar,
      role: "user",
    }).save();

    res.json({ msg: "Signup successful" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ msg: "Email and password required" });

  try {
    // Admin login
    if (email === "admin@example.com" && password === "admin123") {
      return res.json({
        msg: "Admin login successful",
        userId: "admin",
        name: "Admin",
        role: "admin",
      });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ msg: "Invalid credentials" });

    res.json({
      msg: "Login successful",
      userId: user._id,
      name: user.name,
      role: user.role || "user",
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

/* ===================== CHATBOT ===================== */
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

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
                  text: `You are a medical insurance assistant. Provide structured answers about hospitals, treatments, insurance coverage, and reviews.\n\nUser: ${message}`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error("Gemini error:", errText);
      return res.status(500).json({ error: "Gemini API error" });
    }

    const data = await geminiRes.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from Gemini";

    res.json({ reply });
  } catch (err) {
    console.error("❌ Chatbot error:", err);
    res.status(500).json({ error: "Chatbot failed" });
  }
});

/* ===================== ADMIN ===================== */

// All hospitals
app.get("/api/admin/hospitals", async (req, res) => {
  try {
    const hospitals = await Hospital.find({});
    res.json(hospitals);
  } catch (err) {
    console.error("Admin hospital error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// All reviews
app.get("/api/admin/reviews", async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name email")
      .populate("hospital", "hospitalName address");
    res.json(reviews);
  } catch (err) {
    console.error("Admin review error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

/* ===================== START SERVER ===================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


/*




require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const reviewRoutes = require("./routes/reviewRoutes");

const app = express();

app.use(
  cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());


app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));


const User = require("./models/User");
const Hospital = require("./models/Hospital");
const Review = require("./models/review");


app.post("/api/signup", async (req, res) => {
  const { name, email, password, address, state, aadhaar } = req.body;

  if (!name || !email || !password || !address || !state || !aadhaar) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  if (!/^\d{12}$/.test(aadhaar)) {
    return res.status(400).json({ msg: "Aadhaar must be 12 digits" });
  }

  try {
    if (await User.findOne({ email })) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    if (await User.findOne({ aadhaar })) {
      return res.status(400).json({ msg: "Aadhaar already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await new User({
      name,
      email,
      password: hashed,
      address,
      state,
      aadhaar,
      role: "user",
    }).save();

    res.json({ msg: "Signup successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});


app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email === "admin@example.com" && password === "admin123") {
      return res.json({
        msg: "Admin login successful",
        role: "admin",
      });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ msg: "Invalid credentials" });

    res.json({
      msg: "Login successful",
      userId: user._id,
      name: user.name,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

app.get("/api/hospitals/:insurance", async (req, res) => {
  try {
    const hospitals = await Hospital.find({
      insuranceProvider: req.params.insurance,
    });
    res.json(hospitals);
  } catch {
    res.status(500).json({ msg: "Server error" });
  }
});


app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    const fetchFn =
      typeof fetch !== "undefined"
        ? fetch
        : (await import("node-fetch")).default;

    const geminiRes = await fetchFn(
     ` https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text:`You are a medical assistant.\n\nUser: ${message}`, 
                },
              ],
            },
          ],
        }),
      }
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error("Gemini error:", errText);
      return res.status(500).json({ error: errText });
    }

    const data = await geminiRes.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from Gemini";

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Chatbot failed" });
  }
});


app.get("/api/admin/hospitals", async (_, res) => {
  res.json(await Hospital.find());
});

app.get("/api/admin/reviews", async (_, res) => {
  res.json(
    await Review.find()
      .populate("user", "name email")
      .populate("hospital", "hospitalName address")
  );
});

app.use("/api/reviews", reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
*/