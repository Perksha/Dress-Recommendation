const mongoose = require("mongoose");

const dressSchema = new mongoose.Schema({
    dress_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    color: { type: String, required: true },
    style: { type: String, required: true },
    fabric: { type: String, required: true },
    sleeve_length: { type: String, required: true },
    occasion: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    skin_tone_suitability: { type: String, required: true },
    body_shape_suitability: { type: String, required: true },
    past_purchase_history: { type: [String], default: [] },
    extracted_color_preferences: { type: [String], default: [] },
    image: { type: String, required: true },
    category: { type: String, required: true }
});

module.exports = mongoose.model("Dress", dressSchema);
