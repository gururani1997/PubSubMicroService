const mongoose = require("mongoose");
const secondaryDataSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  user: { type: String, required: true },
  class: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, match: /.+\@.+\..+/ },
  inserted_at: { type: Date, default: Date.now },
  modified_at: { type: Date, default: Date.now },
  medium: { type: String, required: true, default: "From SQS SServer" },
});

const SecondaryData = mongoose.model("SecondaryData", secondaryDataSchema);

module.exports = SecondaryData;
