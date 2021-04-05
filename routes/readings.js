const { Reading, validate } = require("../models/readings");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

//Commenting this route out because this call might become a data risk
router.get("/", async (req, res) => {
  const readings = await Reading.find().sort("dateTime");
  res.send(readings);
});

router.get("/:id", async (req, res) => {
  const reading = await Reading.findById(req.params.id);

  if (!reading)
    return res.status(404).send("The reading with the given ID was not found.");

  res.send(reading);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let reading = new Reading({
    value: req.body.value,
    preMed: req.body.preMed,
    dateTime: req.body.dateTime,
    notes: req.body.notes,
  });
  reading = await reading.save();

  res.send(reading);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const reading = await Reading.findByIdAndUpdate(
    req.params.id,
    {
      value: req.body.value,
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

module.exports = router;
