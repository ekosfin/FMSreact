const mongoose = require("mongoose");

const ResetSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Reset", ResetSchema);
