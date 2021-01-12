const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.post("/", async (req, res) => {
  if (req.body.email === null) {
    return res.status(400).json({ message: "bad content" });
  }
  if (req.body.password === null) {
    return res.status(400).json({ message: "bad content" });
  }
  if (req.body.username === null) {
    let newUserWithoutname = new User({
      password: req.body.password,
      email: req.body.email,
    });

    await newUserWithoutname.save((err) => {
      if (err) return res.status(500);
    });

    return res.json({ message: "Added" });
  }

  let newUser = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });

  await newUser.save((err) => {
    if (err) return res.status(500);
  });

  return res.json({ message: "Added" });
});

module.exports = router;
