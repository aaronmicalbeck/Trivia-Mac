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
  }

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
    console.log("Leaderboard Component Mounted");

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
