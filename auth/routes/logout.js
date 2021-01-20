const express = require("express");
const router = express.Router();
const Token = require("../models/tokenModels");

router.post("/", auth_controller.verify_token, async (req, res) => {
  await Token.deleteMany({ userID: req.user._id });
  return res.status(200).json("Logged out");
});

module.exports = router;
