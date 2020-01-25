import React, { Component } from "react";
import { Header } from "../../components";
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
              <NavigationButton/>
            </Link>
            <Link to="/questionSubmission" className="nav-link">
              <NavigationButton/>
            </Link>
            <Link to="/" className="nav-link" onClick={this.props._logout}>
              <NavigationButton/>
            </Link>
            <Link to="/leaderBoard" classname ="nav-link">
              <NavigationButton/>
            </Link>
          <ProfileCard user={this.props.user} />
          <p>Current User:</p>
          <code>{JSON.stringify(this.props)}</code>
        </div>
      );
    } else {
      return (
        <div className="Home">
          <Header user={this.state.user} />
          <p>Current User:</p>
          <code>{JSON.stringify(this.props)}</code>
          <LoginForm _login={this.props._login} />

          <Link to="/signup" className="nav-link">
              <NavigationButton/>
            </Link>
            <Link to="/leaderBoard" className="nav-link">
            <NavigationButton/>
            </Link>
        </div>
      );
    }
  }
}
