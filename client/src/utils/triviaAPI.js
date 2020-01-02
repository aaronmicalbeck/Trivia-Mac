const axios = require("axios");
const questionArray = [];

function broadcastQuestion() {
    axios.get('https://opentdb.com/api.php?amount=50').then((response) => {
    questionArray.push(response.data.results[0]);
    // console.log(questionArray);
    let broadcastedQuestion = questionArray[Math.floor(Math.random() * questionArray.length)];
    console.table('Category: ' + broadcastedQuestion.category);
    console.table('Difficulty: ' + broadcastedQuestion.difficulty);
    console.table('Question: ' + broadcastedQuestion.question);
    console.table('Answers: ' + broadcastedQuestion.correct_answer + ','
     + broadcastedQuestion.incorrect_answers);
})}

export default broadcastQuestion;
