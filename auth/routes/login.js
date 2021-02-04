const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const User = require("../models/userModel");
const Token = require("../models/tokenModels");
const auth_controller = require("../controllers/authController");

router.post(
  "/",
  body("password").not().isEmpty().escape(),
  body("username").not().isEmpty().escape(),
  async (req, res) => {
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
        user.comparePassword(req.body.password, async (err, isMatch) => {
          if (err) {
            console.error(err);
            return res.sendStatus(401);
          }
          if (isMatch) {
            let accessToken = auth_controller.generateAccessToken(user);
            let refreshToken = auth_controller.generatRefreshToken(user);
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
            return res.status(200).json({
              accessToken: accessToken,
              refreshToken: refreshToken,
              message: "Login successful",
            });
          }
        });
      }
    );
  }
);

module.exports = router;
