import axios from "axios";

export default {
  // Gets all Users
  getUser: function() {
    return axios.get("/api/userScore");
  },

};
