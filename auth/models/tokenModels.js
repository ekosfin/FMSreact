const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Token", TokenSchema);
