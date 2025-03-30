const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  user: { type: String, required: true },
  class: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  inserted_at: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
