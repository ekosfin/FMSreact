const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Token = require("../models/tokenModels");
const auth_controller = require("../controllers/authController");

router.get("/", async (req, res) => {
  if (req.body.token === null) {
    return res.status(400).json({ message: "bad content" });
  }
  Token.findOne({ token: req.body.token }, (err, token) => {
    if (err) return res.sendStatus(403);

    jwt.verify(
      req.body.Token,
      process.env.REFRESH_TOKEN_SECRET,
      (err2, user) => {
        if (err2) return res.sendStatus(403);
        let accessToken = auth_controller.generateAccessToken(user);
        return res.json({ accessToken: accessToken });
      }
    );
  });
});

module.exports = router;
