const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load Environment Variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// --- ROUTES ---
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes"); // Added eventRoutes

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes); // Register eventRoutes with /api/events prefix

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// MongoDB Connection + Server Start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    // Default to 5000 if PORT is not defined in .env
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });
