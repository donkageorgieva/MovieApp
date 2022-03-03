const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user");
router.put(
  "/:movieId",
  [body("value").exists().isNumeric({ min: 0, max: 5 })],
  userController.addRating
);

// router.delete(
//   "/:movieId",
//   [body("value").exists().isNumeric({ min: 0, max: 5 })],
//   userController.removeRating
// );
router.get("/:movieId", userController.getRating);

module.exports = router;
