const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);

module.exports = router;
