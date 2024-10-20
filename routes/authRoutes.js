const express = require("express");
const { registerController, loginController, logoutController } = require("../controllers/authController");

const router = express.Router();

// Routes
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);

module.exports = router;
