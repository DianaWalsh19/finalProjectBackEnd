const Joi = require("joi");
const mongoose = require("mongoose");

const readingSchema = new mongoose.Schema({
  value: {
    type: Number,
    trim: true,
    min: 100,
    max: 1000,
  },
  //user: {},
  preMed: {
    type: String,
    enum: ["preMed", "postMed"],
    default: "premed",
  },
  dateTime: { type: Date },
  notes: { type: String },
});

const Reading = mongoose.model("Reading", readingSchema);

function validateReading(reading) {
  const schema = {
    value: Joi.number().required().min(100).max(1000),
    preMed: Joi.string().required(),
    dateTime: Joi.string().required(),
    notes: Joi.string().allow(""),
  };

  return Joi.validate(reading, schema);
}

exports.Reading = Reading;
exports.validate = validateReading;
