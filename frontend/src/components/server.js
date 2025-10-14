import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
g
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

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt + "\n\nUser query: " + message }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 2048 },
        }),
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});