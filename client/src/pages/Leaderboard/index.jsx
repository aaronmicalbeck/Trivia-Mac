import React, { Component } from "react";
import "./leaderboard.css";
import BarChart from "../../components/BarChart";
import chartAPI from "../../utils/chartAPI";

export default class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      users: [],
      userScores: [],
      userNames: []
    };

    this.loadScores = this.loadScores.bind(this);
  }

  // Axios GET request to recieve username's (local) and First/Last Names (Google Auth) and corresponding topScores

  loadScores() {
    chartAPI.getUser().then(res => {
      this.setState({
        userScores: res.data.map(item => {
          return item.topScore
        
        }),
        userNames: res.data.map(item => {
          return item.local
              ? item.local.username
              : item.firstName + " " + item.lastName
          ;
        })
	  });
	
    });
  }

  componentDidMount() {

    this.loadScores();
  }

  render() {
    return (
      <div id="leaderBoard">
        <BarChart labels={this.state.userNames} data={this.state.userScores} />
        
      </div>
    );
  }
}
