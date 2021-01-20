const express = require("express");
const router = express.Router();
const Task = require("../models/taskModel");

router.get("/", async (req, res) => {
  try {
    return res.json(await Task.find({ ownerId: req.user._id }));
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
});

module.exports = router;
