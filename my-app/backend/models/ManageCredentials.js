const mongoose = require("mongoose");

const CredentialsSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  contact: String,
  email: { type: String, unique: true },
  password: String, // Hashed
});

const CredentialModel = mongoose.model("credentials", CredentialsSchema);

module.exports = CredentialModel;
