const router = require("express").Router();
const authController = require("./auth.controller");
const questionController = require("./question.controller");
const scoreController = require("./score.controller");

// API Routes

router.use("/api/questions", questionController);

router.use("/api/score", scoreController);

// Auth Routes
router.use("/auth", authController);

module.exports = router;
