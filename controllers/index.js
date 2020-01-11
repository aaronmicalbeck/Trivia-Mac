const router = require("express").Router();
const bookController = require("./book.controller");
const authController = require("./auth.controller");
const questionController = require("./question.controller");

// API Routes
router.use("/api/books", bookController);
router.use("/api/questions", questionController);

// Auth Routes
router.use("/auth", authController);

module.exports = router;
