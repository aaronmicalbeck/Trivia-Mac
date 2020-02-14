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
      _logout: props._logout,
      topScore: props.topScore
    };
  }

  componentDidMount() {
    console.log(this.state.topScore);
  }

  render() {
    if (this.props.user) {
      return (
        <div className="Home">
          <div className="row2">
            <ProfileCard user={this.props.user} />
          </div>

          <div className="row1">
            
              <Link to="/lobby" className="nav-link">
                <NavigationButton>
                  <span id="homeNavBtnTitle1">Lobby</span>
                </NavigationButton>
              </Link>
              <Link to="/questionSubmission" className="nav-link">
                <NavigationButton>
                  <span id="homeNavBtnTitle2">Submit A Question</span>
                </NavigationButton>
              </Link>
              <Link to="/leaderBoard" className="nav-link">
                <NavigationButton>
                  <span id="homeNavBtnTitle3">Leaderboard</span>
                </NavigationButton>
              </Link>
              <Link to="/" className="nav-link" onClick={this.props._logout}>
                <NavigationButton>
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
