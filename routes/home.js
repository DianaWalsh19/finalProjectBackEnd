const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "My Asthma App", message: "hello" });
});

module.exports = router;
