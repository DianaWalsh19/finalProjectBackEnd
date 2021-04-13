const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
  const db = config.get("db");
  mongoose
    .set("useNewUrlParser", true)
    .set("useFindAndModify", false)
    .set("useCreateIndex", true)
    .set("useUnifiedTopology", true)
    .connect(db)
    .then(() => winston.info(`Connected to ${db}...`));
};
