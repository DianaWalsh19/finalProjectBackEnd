//const asyncMiddleware = require("../middleware/async");
const auth = require("../middleware/auth");
const { Reading, validate } = require("../models/reading");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  throw new Error("Could not get the readings");
  const readings = await Reading.find().sort("-dateTime");
  res.send(readings);
});

router.get("/:id", async (req, res) => {
  const reading = await Reading.findById(req.params.id);

  if (!reading)
    return res.status(404).send("The reading with the given ID was not found.");

  res.send(reading);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid User");

  const reading = new Reading({
    value: req.body.value,
    user: { _id: user._id, email: user.email, password: user.password },
    preMed: req.body.preMed,
    dateTime: req.body.dateTime,
    notes: req.body.notes,
  });
  await reading.save();

  res.send(_.omit(reading, ["password"]));
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid User");

  const reading = await Reading.findByIdAndUpdate(
    req.params.id,
    {
      value: req.body.value,
      user: {
        _id: user._id,
      },
      preMed: req.body.preMed,
      dateTime: req.body.dateTime,
      notes: req.body.notes,
    },
    {
      new: true,
    }
  );

  if (!reading)
    return res.status(404).send("The reading with the given ID was not found.");

  res.send(reading);
});

router.delete("/:id", async (req, res) => {
  const reading = await Reading.findByIdAndRemove(req.params.id);

  if (!reading)
    return res.status(404).send("The reading with the given ID was not found.");

  res.send(reading);
});

async function listReadings() {
  const readings = await Reading.find()
    .populate("user", "_id email -password")
    .select("id user");
  console.log(readings);
}

module.exports = router;
