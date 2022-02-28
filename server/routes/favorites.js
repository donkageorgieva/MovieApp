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
router.post(
  "/notes/:movieId",
  [body("comment").exists().isString().trim().not().isEmpty()],
  favoritesController.addNote
);
router.get("/notes/:movieId", favoritesController.getNotes);
router.put(
  "/ratings/:movieId",
  [body("rating").exists().isNumeric({ min: 0, max: 5 })],
  favoritesController.modifyRating
);
router.get("/ratings/:movieId", favoritesController.getRatings);
module.exports = router;
