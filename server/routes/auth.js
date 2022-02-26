const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth");
const User = require("../models/user");
const demo = require("../middleware/demouser");
const { body } = require("express-validator");
router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .exists()
      .withMessage("Please enter a valid email")
      .normalizeEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value })
          .then((userInDB) => {
            if (userInDB) {
              return Promise.reject("E-mail address already exists");
            }
          })
          .catch((err) => {
            throw err;
          });
      }),
    body("password").exists().isString().trim().isLength({ min: 6 }),
    body("username")
      .notEmpty()
      .isString()
      .trim()
      .custom((value, { req }) => {
        return User.findOne({ username: value })
          .then((userInDB) => {
            if (userInDB) {
              return Promise.reject("Username already exists");
            }
          })
          .catch((err) => {
            throw err;
          });
      }),
  ],
  authControllers.signup
);
router.get("/login", demo.demoUser, authControllers.login);
module.exports = router;
