const mongoose = require("mongoose");
const debug = require("debug")("app:startup");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const logger = require("./middleware/logger");
const users = require("./routes/users");
const readings = require("./routes/readings");
const home = require("./routes/home");
const express = require("express");
const app = express();

mongoose
  .set("useNewUrlParser", true)
  .set("useUnifiedTopology", true)
  .connect("mongodb://localhost/asthmaAppDb")
  .then(() => debug("Connected to MongoDB"))
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => debug.log("Could not connect with MongoDB...", err));

app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(logger);
//app.use(authenticator);
app.use(helmet());
app.use("/api/users", users);
app.use("/api/readings", readings);
app.use("/", home);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled");
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
