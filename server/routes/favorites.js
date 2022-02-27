const express = require("express");
const router = express.Router();
const favoritesController = require("../controllers/favorites");

router.get("/:movieId", favoritesController.getOneFavorite);
router.get("/", favoritesController.getFavorites);
router.post("/", favoritesController.addFavorite);
router.delete("/", (req, res) => {
  res.send("Delete movie");
});

module.exports = router;
