const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.get("/", auth_controller.verify_token, (res, req) => {
  return res.json({ email: req.user.email, username: req.user.username });
});

router.post("/", auth_controller.verify_token, (res, req) => {
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
        if (!req.body.newpassword === null) {
          user.password = req.body.newpassword;
          user.isModified("password");
        }
        if (!req.body.newusername === null) {
          user.username = req.body.newusername;
          user.isModified("username");
        }
        if (!req.body.newemail === null) {
          user.email = req.body.newemail;
          user.isModified("email");
        }
        user.save((err3) => {
          if (err3) return res.json(err3);
        });
        return res.status(200).json("Changed");
      } else {
        return res.status(403).json("Password is wrong");
      }
    });
  });
});

module.exports = router;
