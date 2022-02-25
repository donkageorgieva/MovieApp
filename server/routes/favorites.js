const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Get movies");
});

router.get("/:movieId", (req, res) => {
  res.send("Get movie");
});

router.post("/", (req, res) => {
  res.send("Add movie");
});

router.delete("/", (req, res) => {
  res.send("Delete movie");
});

module.exports = router;
