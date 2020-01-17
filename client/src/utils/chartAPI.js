import axios from "axios";

export default {
  // Gets all books
  getUsers: function() {
    return axios.get("/api/questions");
  },
  // Gets the book with the given id
  getUserById: function(res) {
    return axios.get("/api/questions/");
  },
  // Deletes the book with the given id
  deleteUsers: function(id) {
    return axios.delete("/api/questions/" + id);
  }
};