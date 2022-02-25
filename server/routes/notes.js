const express = require("express");

const router = express.Router();
router.get("/:movieId", (req, res) => {
  res.send("Get movie note");
});

router.post("/:movieId", (req, res) => {
  res.send("Add movie note");
});

router.delete("/:movieId", (req, res) => {
  res.send("Delete movie note");
});

module.exports = router;
