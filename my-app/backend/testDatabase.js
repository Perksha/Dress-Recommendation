const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://perkshagurubalan:Geeta@cluster0.jct1jlx.mongodb.net/loginn")
  .then(() => {
    console.log("✅ MongoDB Connected Successfully!");

    const CredentialModel = require("./models/ManageCredentials");

    CredentialModel.find()
      .then(users => {
        console.log("Users Found:", users);
        mongoose.connection.close(); // Close connection after query
      })
      .catch(err => console.error("❌ Query Error:", err));
  })
  .catch(err => console.error("❌ MongoDB Connection Error:", err));
