const router = require("express").Router();
const bookController = require("./book.controller");
const authController = require("./auth.controller");

// API Routes
router.use("/api/books", bookController);

// Auth Routes
router.use("/auth", authController)

module.exports = router;
