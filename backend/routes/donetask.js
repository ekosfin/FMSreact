const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const Task = require("../models/taskModel");

router.post("/", body("TaskID").not().isEmpty().escape(), async (req, res) => {
  try {
    let task = await Task.findById(req.body.TaskID).exec();
    if (task.ownerId != req.user._id) {
      return res.sendStatus(403);
    }
    task.done = true;
    try {
      await task.save();
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    return res.status(200).json("Changed");
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
});

router.get("/", async (req, res) => {
  try {
    return res.json(await Task.find({ ownerId: req.user._id, done: true }));
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
});

module.exports = router;
