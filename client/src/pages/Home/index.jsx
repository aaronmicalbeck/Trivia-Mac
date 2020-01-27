import React, { Component } from "react";
import { Header } from "../../components";
import "./home.css";
import LoginForm from "../LoginForm";
import ProfileCard from "../../components/ProfileCard";
import axios from "axios";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      topScore: props.topScore
    };
  }

  componentDidMount() {
    // It sure did mount y'all
  }

  render() {
    if (this.props.user) {
      return (
        <div className="Home">
          <ProfileCard user={this.props.user} topScore={this.props.topScore} />
          <p>Current User:</p>
          <code>{JSON.stringify(this.props.user)}</code>
        </div>
      );
    } else {
      return (
        <div className="Home">
          <Header user={this.state.user} />
          <p>Current User:</p>
          <code>{JSON.stringify(this.props)}</code>
          <LoginForm _login={this.props._login} />
        </div>
      );
    }
  }
}
