import axios from "axios";

export default {
  // Gets all Users
  getUser: function() {
    return axios.get("/api/userScore");
  },

   // Gets the user by specific ID
   getOneUser: function(res) {
    return axios.get("/api/userScore/");
  },

};
