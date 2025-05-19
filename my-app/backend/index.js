// index.js (backend/index.js)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");  // Your user routes
const dressRoutes = require("./routes/dressRoutes"); // <-- Import dressRoutes here

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Mount user routes
app.use("/api/users", userRoutes);

// Mount dress routes
app.use("/api/dresses", dressRoutes);  // <-- Add this line to mount dressRoutes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
