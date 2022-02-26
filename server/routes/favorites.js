const express = require("express");
const router = express.Router();
const favoritesController = require("../controllers/favorites");
router.get("/", (req, res) => {
  res.send("Get movies");
});

router.get("/:movieId", (req, res) => {
  res.send("Get movie");
});

router.post("/", favoritesController.addFavorite);

router.delete("/", (req, res) => {
  res.send("Delete movie");
});

module.exports = router;
