const router = require("express").Router();
const authController = require("./auth.controller");
const questionController = require("./question.controller");

// API Routes

router.use("/api/questions", questionController);

// Auth Routes
router.use("/auth", authController);

module.exports = router;
