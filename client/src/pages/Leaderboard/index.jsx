import React, { Component } from "react";
//import { Header } from '../../components';
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
    this.getScores = this.getScores.bind(this);
  }

  loadScores () {
	chartAPI.getGoogleUser().then(res => console.log(res.data));
	// chartAPI.getLocalUser().then(res => console.log(res.data));

  };

  getScores () {

	  console.log(this);


	console.log(this.state.userScores);
	console.log(this.state.userNames);

  }

  componentDidMount() {
    console.log("Leaderboard Component Mounted");

    this.loadScores();
  }

  render() {
    return (
      <div id="leaderBoard">
        <p>Hello Leaderboard</p>
        <BarChart />
		<button id ="scorebutton" onClick = {this.getScores}>Get Scores</button>
      </div>
    );
  }
}
