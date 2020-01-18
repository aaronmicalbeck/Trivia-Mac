const router = require("express").Router();
const authController = require("./auth.controller");
const questionController = require("./question.controller");
const scoreController = require("./score.controller");
const chartController = require("./chart.controller");

// API Routes

router.use("/api/questions", questionController);

router.use("/api/score", scoreController);

router.use("/api/userscore", chartController);

// Auth Routes
router.use("/auth", authController);

module.exports = router;
