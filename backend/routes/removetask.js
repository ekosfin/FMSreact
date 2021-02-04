const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const Task = require("../models/taskModel");

router.post("/", body("_id").not().isEmpty().escape(), async (req, res) => {
  try {
    return res.json(await Task.findOneAndDelete({ _id: req.body._id }));
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
});

module.exports = router;
