const express = require("express");
const router = express.Router();
const Task = require("../models/taskModel");

router.post("/", async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, ownerId: req.user._id });

    return res.json(task.toObject());
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
});

module.exports = router;
