require("dotenv").config();
const mongoose = require("mongoose");
const DressModel = require("../models/DressModel");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Delete all dresses
const deleteDresses = async () => {
  try {
    await DressModel.deleteMany();
    console.log("🗑️ All old dresses deleted successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error deleting dresses:", error);
    mongoose.connection.close();
  }
};

// Run function
deleteDresses();
