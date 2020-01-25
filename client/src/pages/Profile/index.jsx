import React, { Component } from "react";
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
    // MounTed's Excellent Adventure
  }

  render() {
    return (
      <div>
        <ProfileCard user={this.state.user} />
      </div>
    );
  }
}
