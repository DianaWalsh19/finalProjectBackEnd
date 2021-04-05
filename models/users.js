const Joi = require("joi");
const mongoose = require("mongoose");

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      validate: [validateEmail, "Please provide a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: { type: String, required: true, minlength: 8, trim: true },
  })
);

function validateUser(user) {
  const schema = {
    email: Joi.string(),
    password: Joi.string().min(8),
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
