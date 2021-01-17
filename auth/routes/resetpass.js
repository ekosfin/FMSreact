const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const User = require("../models/userModel");
const Reset = require("../models/resetModel");

require("dotenv").config();

router.post("/", async (req, res) => {
  //asks for password reset
  if (req.body.email === null) {
    return res.status(400).json({ message: "bad content" });
  }
  let randURL = crypto.randomBytes(20).toString("hex");
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500);
    }

    let newReset = new Reset({
      url: randURL,
      email: user.email,
    });

    newReset.save((err2) => {
      if (err2) {
        console.log(err2);
        return res.status(500);
      }
    });

    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      // For dev testing
      tls: {
        rejectUnauthorized: false,
      },
    });

    let mailOptions = {
      from: '"FMS react mailer" <' + process.env.EMAIL_USERNAME + ">", // sender address
      to: user.email, // list of receivers
      subject: "FMS react password reset", // Subject line
      text:
        "This is the password reset link for your account " +
        process.env.URL_ADDRESS +
        "/" +
        randURL, // plain text body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      res.status(200).json("Email has been sent");
    });
  });
});

router.post("/:id", async (req, res) => {
  //changes password
  Reset.findOne({ url: req.params.id }, (err, reset) => {
    if (err) return res.status(403).json("Invalid address");

    User.findOne({ email: reset.email }, (err2, user) => {
      if (err2) return res.status(500);
      //TODO needs discussion with the group
    });
  });
});

module.exports = router;
