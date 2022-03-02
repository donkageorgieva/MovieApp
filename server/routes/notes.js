const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { body } = require("express-validator");

router.post(
  "/:movieId",
  [body("comment").exists().isString().trim().not().isEmpty()],
  userController.addNote
);
// router.delete("/:movieId");
// router.get("/:movieId", favoritesController.getNotes);

module.exports = router;
