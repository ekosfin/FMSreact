const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Token = require("../models/tokenModels");

router.get("/", async (req, res) => {
  if (req.body.token === null) {
    return res.status(400).json({ message: "bad content" });
  }
  Token.findOne({ token: req.body.token }, (err, token) => {
    if (err) return res.status(403);

    jwt.verify(
      req.body.Token,
      process.env.REFRESH_TOKEN_SECRET,
      (err2, user) => {
        if (err2) return res.status(403);
        let accessToken = generateAccessToken(user);
        return res.json({ accessToken: accessToken });
      }
    );
  });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
}

module.exports = router;
