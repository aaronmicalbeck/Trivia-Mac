import axios from "axios";

export default {
  // Gets all questions
  getQuestions: function() {
    return axios.get("/api/questions");
  },
  // Gets the question given an ID
  getQuestion: function(res) {
    return axios.get("/api/questions/");
  },
  // Deletes the question with the given id
  deleteQuestion: function(id) {
    return axios.delete("/api/questions/" + id);
  },
  // Saves a question to the database
  submitQuestion: function(questionData) {
    return axios.post("/api/questions", questionData);
  }
};
