const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .set("useNewUrlParser", true)
    .set("useFindAndModify", false)
    .set("useCreateIndex", true)
    .set("useUnifiedTopology", true)
    .connect("mongodb://localhost/asthmaAppDb")
    .then(() => winston.info("Connected to MongoDB"));
};
