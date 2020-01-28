import React, { Component } from "react";
import "./home.css";
import LoginForm from "../LoginForm";
import ProfileCard from "../../components/ProfileCard";
import { Link } from "react-router-dom";
import NavigationButton from "../../components/NavigationButton";
import gsap from "gsap";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      _logout: props._logout
    };
  }

  componentDidMount() {


    gsap.from("#welcomeMessage1", { duration: 2, delay: 1, x: "-101%", opacity: 0 }) &&
      gsap.from("#welcomeMessage2", { duration: 2, delay: 1, x: "101%", opacity: 0 })



  }

  render() {
    if (this.props.user) {
      return (
        <div className="Home">
          <div class="row">
            <div class="column side">
              <Link to="/lobby" className="nav-link">
                <NavigationButton><span id="homeNavBtnTitle1">Lobby</span></NavigationButton>
              </Link>
              <Link to="/questionSubmission" className="nav-link">
                <NavigationButton><span id="homeNavBtnTitle2">Submit A Question</span></NavigationButton>
              </Link>
              <Link to="/leaderBoard" className="nav-link">
                <NavigationButton><span id="homeNavBtnTitle3">Leaderboard</span></NavigationButton>
              </Link>
            </div>

            <div class="column middle">
              <ProfileCard user={this.props.user} />
            </div>

            <div class="column side">
              <Link to="/" className="nav-link" onClick={this.props._logout}>
                <NavigationButton><span id="homeNavBtnLogout">Logout</span></NavigationButton>
              </Link>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="Home">
          <LoginForm _login={this.props._login} />
        </div>
      );
    }
  }
}
