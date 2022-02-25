const express = require("express");

const router = express.Router();
router.get("/:movieId", (req, res) => {
  res.send("Get ratings");
});

router.put("/:movieId", (req, res) => {
  res.send("Get movie rating");
});

router.delete("/:movieId", (req, res) => {
  res.send("Delete movie rating");
});

module.exports = router;
