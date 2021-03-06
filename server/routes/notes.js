const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { body } = require("express-validator");

router.post(
  "/:movieId",
  [body("comment").exists().isString().trim().not().isEmpty()],
  userController.addNote
);
router.get("/:movieId", userController.getNotes);
router.delete("/:movieId", userController.deleteNote);

module.exports = router;
