// server.js
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const reviewRoutes = require("./routes/reviewRoutes");
const app = express();

// --- Middlewares ---
app.use(
  cors({
    origin: '*', // in production replace '*' with your frontend origin, e.g. 'https://yourdomain.com'
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
  })
);

// Express has built-in body parser
app.use(express.json());



// Connect to MongoDB
mongoose.connect("mongodb+srv://22csec03_db_user:IPPqLpSUe0LurJkk@cluster0.30lj2xn.mongodb.net/policycare?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("✅ MongoDB Connected to Atlas"))
.catch(err => console.error("❌ MongoDB connection error:", err));



// --- Models (ensure these modules use module.exports) ---
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
    // default role is 'user' - admin accounts should be created separately
    const newUser = new User({ name, email, password: hashed, address, state, aadhaar, role: "user" });
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

  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password required" });
  }

  try {
    // ✅ Step 1: Check if it's the Admin login
    if (email === "admin@example.com" && password === "admin123") {
      return res.json({
        msg: "Admin login successful",
        userId: "admin", // dummy id
        name: "Admin",
        role: "admin"
      });
    }

    // ✅ Step 2: Normal User login check
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


// --------------------- Chatbot ---------------------
app.post("/api/chat", async (req, res) => {
  const { question } = req.body;

  if (!question) return res.status(400).json({ msg: "Question is required" });

  try {
    let answer = "Sorry, I don't have an answer for that.";

    // 1. List all hospitals
    if (/hospitals/i.test(question)) {
      const hospitals = await Hospital.find().distinct("hospitalName");
      answer = `Hospitals available: ${hospitals.join(", ")}`;
    }

    // 2. Insurance providers in a hospital
    else if (/insurance provider.*(\w+)/i.test(question)) {
      const match = question.match(/insurance provider.*(\w+)/i);
      const hospital = match[1];
      const providers = await Hospital.find({ hospitalName: hospital }).distinct("insuranceProvider");
      answer = providers.length
        ? `Insurance providers at ${hospital}: ${providers.join(", ")}`
        : `No data for ${hospital}`;
    }

    // 3. Treatments in a policy
    else if (/treatments.*(\w+)/i.test(question)) {
      const match = question.match(/treatments.*(\w+)/i);
      const policy = match[1];
      const treatments = await Hospital.find({ policyName: policy }).distinct("treatmentsCovered");
      answer = treatments.length
        ? `Treatments covered under ${policy}: ${treatments.join(", ")}`
        : `No data for ${policy}`;
    }

    res.json({ answer });
  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});
app.post("/api/chat", (req, res) => {
  const { question } = req.body;
  const q = question.toLowerCase();

  let answer = "I'm not sure about that. Please ask about hospitals, policies, services, or claim days.";

  // 👇 Add replies relevant to your seedhospital.js
  if (q.includes("hospital")) {
    answer = "We have hospitals like Rajamani, Velammal, and Apollo available in our network.";
  } else if (q.includes("claim")) {
    answer = "Claim processing usually takes 3–5 working days depending on the hospital.";
  } else if (q.includes("policy")) {
    answer = "We support policies from Star Health, ICICI Lombard, and HDFC ERGO.";
  } else if (q.includes("cashless")) {
    answer = "Yes, cashless facility is available for Star Health and HDFC ERGO policies.";
  } else if (q.includes("qr")) {
    answer = "You can scan your QR code on the hospital dashboard to verify your insurance details.";
  } else if (q.includes("service")) {
    answer = "Our hospitals provide services like ECG, X-Ray, surgery, and 24x7 emergency care.";
  }

  res.json({ answer });
});

app.use('/api/reviews', require('./routes/reviewRoutes'));


// --------------------- Chatbot (Final Clean Version) ---------------------
app.post("/api/chat", async (req, res) => {
  const { question } = req.body;
  if (!question) return res.status(400).json({ msg: "Question is required" });

  try {
    const q = question.toLowerCase();
    let answer = "I'm not sure about that. Please ask about hospitals, policies, services, or claim days.";

    // 🏥 Hospital-related answers
    if (q.includes("hospital") || q.includes("available hospitals")) {
      const hospitals = await Hospital.find().distinct("hospitalName");
      answer = hospitals.length
        ? `Hospitals available in our network are: ${hospitals.join(", ")}.`
        : "No hospitals found in the database.";
    }

    // 💳 Insurance-related answers
    else if (q.includes("insurance") || q.includes("policy")) {
      const insurances = await Hospital.find().distinct("insuranceProvider");
      answer = insurances.length
        ? `Supported insurance providers include: ${insurances.join(", ")}.`
        : "No insurance data found.";
    }

    // 🏥 Claim days
    else if (q.includes("claim")) {
      answer = "Claim processing usually takes 3–5 working days depending on the hospital and insurance provider.";
    }

    // 🧾 Cashless facility
    else if (q.includes("cashless")) {
      answer = "Yes, cashless facility is available for Star Health and HDFC ERGO policies in our partner hospitals.";
    }

    // 📱 QR verification
    else if (q.includes("qr") || q.includes("scan")) {
      answer = "You can scan the QR code on your hospital dashboard to verify your policy details instantly.";
    }

    // 🏨 Services offered
    else if (q.includes("service") || q.includes("treatment")) {
      const services = await Hospital.find().distinct("servicesProvided");
      answer = services.length
        ? `Hospitals offer services like: ${services.join(", ")}.`
        : "No specific service data found.";
    }

    res.json({ answer });
  } catch (err) {
    console.error("❌ Chatbot error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

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

    // Node 18+ has global fetch. If you're on older Node, install node-fetch and require it.
    // const fetch = global.fetch || require('node-fetch');
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

// --------------------- Start Server ---------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
// Fetch all users (for admin)
app.get("/api/admin/users", async (req, res) => {
  try {
    const users = await User.find({}, "name email address state"); // only required fields
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});
// server.js



// Get all hospitals for admin
// Get all hospitals for admin
app.get("/api/admin/hospitals", async (req, res) => {
  try {
    const hospitals = await Hospital.find({}); // fetch all
    res.json(hospitals);
  } catch (err) {
    console.error("Error fetching hospitals:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

const Review = require("./models/review"); // create Review model if not already

// --------------------- Get Reviews ---------------------
app.get("/api/admin/reviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

