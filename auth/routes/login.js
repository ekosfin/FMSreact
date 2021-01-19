const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Token = require("../models/tokenModels");

router.post("/", async (req, res) => {
  if (req.body.password === null) {
    return res.status(400).json({ message: "bad content" });
  }
  if (req.body.username === null) {
    return res.status(400).json({ message: "bad content" });
  }
  User.findOne(
    { $or: [{ username: req.body.username }, { email: req.body.username }] },
    (err, user) => {
      if (err) return res.status(500);

      // test a matching password
      user.comparePassword(req.body.username, async (err2, isMatch) => {
        if (err2) return res.status(401);
        if (isMatch) {
          let accessToken = generateAccessToken(user);
          let refreshToken = generatRefreshToken(user);
          let newRefreshToken = new Token({
            userID: user._id,
            token: refreshToken,
          });
          await newRefreshToken.save((err3) => {
            if (err3) return res.status(500);
          });
          return res
            .status(200)
            .json({ accessToken: accessToken, refreshToken: refreshToken });
        }
      });
    }
  );
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
}

function generatRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}

module.exports = router;
