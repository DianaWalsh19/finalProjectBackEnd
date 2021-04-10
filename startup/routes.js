const express = require("express");
const helmet = require("helmet");
const error = require("../middleware/error");
const users = require("../routes/users");
const readings = require("../routes/readings");
const home = require("../routes/home");
const auth = require("../routes/auth");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  app.use(auth);
  app.use(helmet());
  app.use("/api/users", users);
  app.use("/api/readings", readings);
  app.use("/api/auth", auth);
  app.use("/", home);
  app.use(error);
};
