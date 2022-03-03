const express = require("express");
const router = express.Router();
const favoritesController = require("../controllers/favorites");
const { body } = require("express-validator");
router.get("/favorites/:movieId", favoritesController.getOneFavorite);
router.get("/favorites", favoritesController.getFavorites);
router.post(
  "/favorites",
  [
    body("name")
      .exists()
      .isString()
      .trim()
      .not()
      .isEmpty()
      .withMessage("Empty or invalid type name"),
    body("movieId")
      .exists()
      .isString()
      .trim()
      .not()
      .isEmpty()
      .withMessage("Empty or invalid type movieId"),
  ],
  favoritesController.addFavorite
);
router.delete("/favorites/:movieId", favoritesController.deleteOneFavorite);

module.exports = router;
