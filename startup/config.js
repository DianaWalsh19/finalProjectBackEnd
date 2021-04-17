const config = require("config");

module.exports = function () {
  if (!config.has("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: JWTPriateKey is not defined");
  }
};
