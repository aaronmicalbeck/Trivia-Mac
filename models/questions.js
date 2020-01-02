const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    Question: { type: String, required: true, minlength: 10, maxlength: 500 },
    author: { type: String, required: true },
    correctAnswer: { type: String, minlength: 1, maxlength: 50 },
    incorrectAnswer1: { type: String, minlength: 1, maxlength: 50 },
    incorrectAnswer2: { type: String, minlength: 1, maxlength: 50 },
    incorrectAnswer3: { type: String, minlength: 1, maxlength: 50 },
    date: { type: Date, default: Date.now }
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;