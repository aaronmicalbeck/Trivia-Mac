import React, { Component } from "react";
import { Header } from "../../components";
import "./home.css";
import { LoginForm } from "../../components";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user
    };
  }

  componentDidMount() {
    console.log("Home Component Mounted");
  }

  render() {
    if (this.props.user) {
      return (
        <div className="Home">
          {/* <LoginForm /> */}
          <Header user={this.state.user} />
          <p>Current User:</p>
          <code>{JSON.stringify(this.props)}</code>
        </div>
      );
    } else {
      return (
        <div className="Home">
          {/* <LoginForm /> */}
          <Header user={this.state.user} />
          <p>Current User:</p>
          <code>{JSON.stringify(this.props)}</code>
        </div>
      );
    }
  }
}
