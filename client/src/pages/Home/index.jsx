import React, { Component } from "react";
import "./home.css";
import LoginForm from "../LoginForm";
import ProfileCard from "../../components/ProfileCard";
import { Link } from "react-router-dom";
import NavigationButton from "../../components/NavigationButton";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      response: false,
      _logout: props._logout,
      topScore: props.topScore
    };
  }

  componentDidMount() {
    // ye
  }

  render() {
    if (this.props.user) {
      return (
        <div className="Home">
          <div id="homeRow2">
            <ProfileCard user={this.props.user} />
          </div>

          <div id="homeRow1">
            <Link to="/lobby" className="nav-link">
              <NavigationButton id="lobbyNavBtn">
                <span id="homeNavBtnTitle1">Lobby</span>
              </NavigationButton>
            </Link>
            <Link to="/questionSubmission" className="nav-link">
              <NavigationButton id="submitQuestionNavBtn">
                <span id="homeNavBtnTitle2">Submit A Question</span>
              </NavigationButton>
            </Link>
            <Link to="/leaderBoard" className="nav-link">
              <NavigationButton id="leaderboardNavBtn">
                <span id="homeNavBtnTitle3">Leaderboard</span>
              </NavigationButton>
            </Link>
            <Link to="/" className="nav-link" onClick={this.props._logout}>
              <NavigationButton id="logoutNavBtn">
                <span id="homeNavBtnLogout">Logout</span>
              </NavigationButton>
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className="Home">
          <LoginForm _login={this.props._login} />
        </div>
      );
    }
  }
}
