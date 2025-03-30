const express = require("express");
const router = express.Router();
const receiverController = require("../controllers/receiverUserController");
const { body, validationResult } = require("express-validator");
const { authenticateJWT } = require("../helper/auth");

router.post("/get-token", receiverController.login);
router.post(
  "/receiver",
  authenticateJWT,
  [
    body("user").isString().withMessage("User name must be a string"),
    body("class").isString().withMessage("Class name must be a string"),
    body("age").isNumeric().withMessage("Age must be a number"),
    body("email").isEmail().withMessage("Invalid email format"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    next();
  },
  receiverController.saveData
);

module.exports = router;
