const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Token = require("../models/tokenModels");

router.post("/", authenticateToken, async (req, res) => {
  await Token.deleteMany({ userID: req.user._id });
  return res.status(200).json("Logged out");
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;
