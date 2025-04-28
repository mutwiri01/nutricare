/* eslint-disable no-undef */
import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Nutrition Backend Server is Running 🚀");
});

// Groq API Proxy Endpoint
app.post("/api/groq", async (req, res) => {
  try {
    const { messages } = req.body;

    // Validate input
    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({
        error: "Server misconfiguration",
        message: "GROQ_API_KEY is missing in environment variables",
      });
    }

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: "Invalid request",
        message: "Messages array is required",
      });
    }

    // Ensure messages have the correct structure
    const validatedMessages = messages.map((msg) => ({
      role: msg.role || "user",
      content: msg.content || "",
    }));

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-70b-8192", // Updated to current recommended model
        messages: validatedMessages,
        temperature: 1.0,
        max_tokens: 1500,
        stream: false,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 30000,
      }
    );

    // Handle Groq API response
    if (!response.data.choices || !response.data.choices[0]) {
      throw new Error("Invalid response format from Groq API");
    }

    res.json({
      success: true,
      message: {
        role: "assistant",
        content: response.data.choices[0].message.content,
      },
    });
  } catch (error) {
    console.error("Groq API Error:", error.message);

    let status = 500;
    let errorMessage = "Failed to process your request";

    if (error.response) {
      status = error.response.status;
      errorMessage =
        error.response.data?.error?.message || `Groq API error: ${status}`;
    }

    res.status(status).json({
      success: false,
      error: errorMessage,
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
