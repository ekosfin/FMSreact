const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const auth_controller = require("../controllers/authController");

router.get("/", auth_controller.verify_token, (req, res) => {
  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    } else {
      return res.json({ email: user.email, username: user.username });
    }
  });
});

router.post("/", auth_controller.verify_token, (req, res) => {
  if (req.body.password === null) {
    return res.status(400).json({ message: "bad content" });
  }
  User.findOne({ _id: req.user._id }, (err, user) => {
    if (err) return res.sendStatus(500);
    if (!user) return res.sendStatus(403);

    // test a matching password
    user.comparePassword(req.body.password, async (err2, isMatch) => {
      if (err2) return res.sendStatus(401);
      if (isMatch) {
        if (req.body.newpassword !== null) {
          user.password = req.body.newpassword;
        }
        if (req.body.newusername !== null) {
          user.username = req.body.newusername;
        }
        if (req.body.newemail !== null) {
          user.email = req.body.newemail;
        }
        try {
          await user.save();
        } catch (err) {
          console.error(err);
          return res.sendStatus(500);
        }
        return res.status(200).json("Changed");
      } else {
        return res.status(403).json("Password is wrong");
      }
    });
  });
});

router.delete("/", auth_controller.verify_token, (req, res) => {
  User.findByIdAndDelete(req.user, (err, user) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    } else {
      return res.status(200).json("User deleted");
    }
  });
});

module.exports = router;
