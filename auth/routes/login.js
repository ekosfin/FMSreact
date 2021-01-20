const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Token = require("../models/tokenModels");
const jwt = require("jsonwebtoken");

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
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      if (!user) {
        return res.sendStatus(403);
      }

      // test a matching password
      user.comparePassword(req.body.password, async (err2, isMatch) => {
        if (err2) {
          console.error(err2);
          return res.sendStatus(401);
        }
        if (isMatch) {
          let accessToken = generateAccessToken(user);
          let refreshToken = generatRefreshToken(user);
          let newRefreshToken = new Token({
            userID: user._id,
            token: refreshToken,
          });
          try {
            await newRefreshToken.save();
          } catch (err) {
            console.error(err);
            return res.sendStatus(500);
          }
          return res
            .status(200)
            .json({ accessToken: accessToken, refreshToken: refreshToken });
        }
      });
    }
  );
});

function generateAccessToken(user) {
  return jwt.sign(user.toObject(), process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "9999m",
  });
}

function generatRefreshToken(user) {
  return jwt.sign(user.toObject(), process.env.REFRESH_TOKEN_SECRET);
}

module.exports = router;
