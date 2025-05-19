require("dotenv").config();
const mongoose = require("mongoose");
const DressModel = require("../models/DressModel");
const path = require("path");
const fs = require("fs");

// Correct the path to dresses.json
const dressesPath = path.resolve(__dirname, "../data/dresses.json");

// Check if the file exists
if (!fs.existsSync(dressesPath)) {
    console.error("❌ dresses.json file not found!");
    process.exit(1);
}

// Read and parse JSON
let dresses = [];
try {
    const dressesData = fs.readFileSync(dressesPath, "utf-8");
    dresses = JSON.parse(dressesData);
    console.log("✅ Dresses JSON loaded successfully!");
} catch (error) {
    console.error("❌ Error reading JSON file:", error);
    process.exit(1);
}

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Import Data Function
const importData = async () => {
  try {
    await DressModel.deleteMany(); // Clears old data
    await DressModel.insertMany(dresses); // Insert JSON data into DB
    console.log("🎉 Dresses imported successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error importing dresses:", error);
    mongoose.connection.close();
  }
};

// Run the function
importData();
