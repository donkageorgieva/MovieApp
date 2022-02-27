const express = require("express");
const router = express.Router();
const favoritesController = require("../controllers/favorites");

router.get("/:movieId", favoritesController.getOneFavorite);
router.get("/", favoritesController.getFavorites);
router.post("/", favoritesController.addFavorite);
router.delete("/:movieId", favoritesController.deleteOneFavorite);
router.delete("/");
module.exports = router;
