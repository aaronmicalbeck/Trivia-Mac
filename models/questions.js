const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: { type: String, required: true, minlength: 1, maxlength: 500 },
    correctAnswer: { type: String, minlength: 1, maxlength: 50 },
    incorrectAnswer1: { type: String, minlength: 1, maxlength: 50 },
    incorrectAnswer2: { type: String, minlength: 1, maxlength: 50 },
    incorrectAnswer3: { type: String, minlength: 1, maxlength: 50 },
   
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;