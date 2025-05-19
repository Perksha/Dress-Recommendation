const express = require("express");
const DressModel = require("../models/DressModel");

const router = express.Router();

// ✅ Get Dresses from MongoDB with Filters
router.get("/get-dresses", async (req, res) => {
  try {
    let query = {};

    console.log("🔍 Received filters:", req.query); // Debugging

    if (req.query.occasion) {
      console.log("🛑 Filtering by category:", req.query.occasion);
      query.category = { $regex: new RegExp(`^${req.query.occasion}$`, "i") };
    }

    if (req.query.price) {
      console.log("💰 Filtering by price:", req.query.price);
      if (req.query.price === "below600") {
        query.price = { $lt: 600 };
      } else if (req.query.price === "600-2000") {
        query.price = { $gte: 600, $lte: 2000 };
      } else if (req.query.price === "above2000") {
        query.price = { $gt: 2000 };
      }
    }

    console.log("📂 MongoDB Query:", query);

    const dresses = await DressModel.find(query);
    res.json(dresses);
  } catch (error) {
    console.error("❌ Error fetching dresses:", error);
    res.status(500).json({ message: "❌ Error fetching dresses", error });
  }
});

module.exports = router;
