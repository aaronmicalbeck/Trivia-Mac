import axios from "axios";

export default {
  // Gets all Google Users
  getGoogleUser: function() {
    return axios.get("/api/userScore");
  },

  // Gets all Local Users

  // getLocalUser: function(){
  //   return axios.get("/api/userScore");
  // }
};
