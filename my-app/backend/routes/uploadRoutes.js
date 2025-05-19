const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

router.post("/", upload.single("image"), async (req, res) => {
  const imagePath = `uploads/${req.file.filename}`;

  try {
    // 1. Call Python ML API (local CNN model)
    const form = new FormData();
    form.append("file", fs.createReadStream(imagePath));
    
    const mlResponse = await axios.post("http://localhost:5001/predict", form, {
      headers: form.getHeaders(),
    });

    // 2. Call Avaturn API (prepare only if using server-side initiation)
    // NOTE: You can also handle Avaturn via frontend Web SDK (better)

    res.json({
      imagePath: `/${imagePath}`,
      score: mlResponse.data.score,
    });
  } catch (err) {
    console.error("Error during ML/Avatar call:", err);
    res.status(500).json({ error: "Processing failed." });
  }
});
