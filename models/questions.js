const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    Question: { type: String, required: true },
    author: { type: String, required: true },
    answer: { type: String },
    date: { type: Date, default: Date.now }
});

const Question = mongoose.model("Question", bookSchema);

module.exports = Question;