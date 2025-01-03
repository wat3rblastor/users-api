const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController"); // Match exact filename
const authMiddleware = require("../middleware/auth");

router.use(authMiddleware);

// Refactored HW 7 endpoints
router.get("/", UserController.getUser);
router.post("/", UserController.createUser);
router.delete("/:id", UserController.deleteUser);
router.put("/:id", UserController.updateUser);

// New HW 8 endpoint
router.get("/profiles", UserController.getUserProfile);

module.exports = router;
