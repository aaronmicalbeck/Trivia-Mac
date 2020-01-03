import axios from "axios";

export default {
  // Gets all books
  getQuestions: function() {
    return axios.get("/api/questions");
  },
  // Gets the book with the given id
  getQuestion: function(id) {
    return axios.get("/api/questions/" + id);
  },
  // Deletes the book with the given id
  deleteQuestion: function(id) {
    return axios.delete("/api/questions/" + id);
  },
  // Saves a book to the database
  submitQuestion: function(questionData) {
    return axios.post("/api/questions", questionData);
  }
};
