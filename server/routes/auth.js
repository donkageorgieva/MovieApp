const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth");
const Account = require("../models/account");
const demo = require("../middleware/demo");
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
        return Account.findOne({ email: value })
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
        return Account.findOne({ username: value })
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
router.post("/login", demo.demoAccount, authControllers.login);
module.exports = router;
