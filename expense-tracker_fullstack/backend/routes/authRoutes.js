const express = require("express");
const router = express.Router();
const { register, login, verifyGoogleToken } = require("../controllers/authController");

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

// Google token verification route
router.post("/google/verify", verifyGoogleToken);

module.exports = router;
