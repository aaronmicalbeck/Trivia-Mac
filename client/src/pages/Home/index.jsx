import React, { Component } from "react";
import "./home.css";
import LoginForm from "../LoginForm";
import ProfileCard from "../../components/ProfileCard";
import {Link} from "react-router-dom";
import NavigationButton from "../../components/NavigationButton";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      _logout: props._logout
    };
  }

  componentDidMount() {

   console.log("Home Mounted")

  }

  render() {
    if (this.props.user) {
      return (
        <div className="Home">
          <Link to="/lobby" className="nav-link">
          <NavigationButton><span id="homeNavBtnTitle">Lobby</span></NavigationButton>
            </Link>
            <Link to="/questionSubmission" className="nav-link">
            <NavigationButton><span id="homeNavBtnTitle">Submit A Question</span></NavigationButton>
            </Link>
            <Link to="/" className="nav-link" onClick={this.props._logout}>
            <NavigationButton><span id="homeNavBtnTitle">Logout</span></NavigationButton>
            </Link>
            <Link to="/leaderBoard" classname ="nav-link">
            <NavigationButton><span id="homeNavBtnTitle">Leaderboard</span></NavigationButton>
            </Link>
          <ProfileCard user={this.props.user} />
        </div>
      );
    } else {
      return (
        <div className="Home">
          <code>{JSON.stringify(this.props)}</code>
          <LoginForm _login={this.props._login} />

          <Link to="/signup" className="nav-link">
          <NavigationButton><span id="homeNavBtnTitle">Register</span></NavigationButton>
            </Link>
            <Link to="/leaderBoard" className="nav-link">
            <NavigationButton><span id="homeNavBtnTitle">Leaderboard</span></NavigationButton>
            </Link>
        </div>
      );
    }
  }
}
