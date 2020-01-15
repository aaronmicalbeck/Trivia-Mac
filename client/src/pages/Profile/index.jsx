import React, { Component } from "react";
//import { Header } from '../../components';
import "./profile.css";
import ProfileCard from "../../components/ProfileCard";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user
    };
  }

  componentDidMount() {
    console.log("Profile Component Mounted");
  }

  render() {
    return (
      <div>
        <p>Hello Profile</p>

        <ProfileCard user={this.state.user} />
      </div>
    );
  }
}
