import React, { Component } from "react";
import "./profile.css";
import ProfileCard from "../../components/ProfileCard";
import {Link} from "react-router-dom";
import NavigationButton from "../../components/NavigationButton";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      _logout: props._logout
    };
  }

  componentDidMount() {
    // MounTed's Excellent Adventure
  }

  render() {
    return (
      <div>
        <Link to="/lobby" className="nav-link">
              <NavigationButton/>
            </Link>
            <Link to="/questionSubmission" className="nav-link">
              <NavigationButton/>
            </Link>
            <Link to="/" className="nav-link" onClick={this.props._logout}>
              <NavigationButton/>
            </Link>

        <ProfileCard user={this.state.user} />
      </div>
    );
  }
}
