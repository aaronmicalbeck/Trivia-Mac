import axios from "axios";

export default {
  // Gets all Users
  getGoogleUser: function() {
    return axios.get("/api/userScore");
  },

};
