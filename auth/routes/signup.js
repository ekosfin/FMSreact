const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { body, validationResult } = require("express-validator");

router.post(
  "/",
  body("email").isEmail().withMessage("invalid email address").normalizeEmail(),
  body("password")
    .isLength({ min: 8, max: 32 })
    .withMessage("your password must have between 8 and 32 charachers")
    .matches(/\d/)
    .withMessage("your password must have at least one number")
    .trim()
    .escape(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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
      try {
        await newUserWithoutname.save();
      } catch (err) {
        console.error(err);
        return res.sendStatus(500);
      }

      return res.json({ message: "Added" });
    }

    let newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
    try {
      await newUser.save();
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }

    return res.json({ message: "Added" });
  }
);

module.exports = router;
