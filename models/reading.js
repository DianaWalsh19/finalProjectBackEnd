const Joi = require("joi");
const mongoose = require("mongoose");
const { userSchema } = require("./user");

const readingSchema = new mongoose.Schema({
  value: {
    type: Number,
    trim: true,
    min: 100,
    max: 1000,
  },
  user: {
    type: userSchema,
    required: true,
    trim: true,
  },
  preMed: {
    type: String,
    enum: ["preMed", "postMed"],
    default: "premed",
  },
  dateTime: { type: Date, require: true, default: Date.now },
  notes: { type: String, maxlength: 255 },
});

const Reading = mongoose.model("Reading", readingSchema);

function validateReading(reading) {
  const schema = {
    value: Joi.number().required().min(100).max(1000),
    //userId: Joi.objectId().required(),
    preMed: Joi.string().required(),
    dateTime: Joi.string().required(),
    notes: Joi.string().allow(""),
  };

  return Joi.validate(reading, schema);
}

exports.readingSchema = readingSchema;
exports.Reading = Reading;
exports.validate = validateReading;
