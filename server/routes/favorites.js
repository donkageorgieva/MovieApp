const express = require("express");
const router = express.Router();
const favoritesController = require("../controllers/favorites");

router.get("/favorites/:movieId", favoritesController.getOneFavorite);
router.get("/favorites", favoritesController.getFavorites);
router.post("/favorites", favoritesController.addFavorite);
router.delete("/favorites/:movieId", favoritesController.deleteOneFavorite);
router.post("/notes/:movieId", favoritesController.addNote);
router.get("/notes/:movieId", favoritesController.getNotes);
router.put("/ratings/:movieId", favoritesController.addRating);
router.get("/ratings/:movieId", favoritesController.getRatings);
module.exports = router;
