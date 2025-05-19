const uploadRoutes = require("./routes/uploadRoutes");
const path = require("path");

// Serve static folder for uploads
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/api/upload", uploadRoutes);
