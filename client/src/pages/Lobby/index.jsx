import React, { Component } from "react";
import "./lobby.css";
import { Link } from "react-router-dom";
import NavigationButton from "../../components/NavigationButton";

import gsap from "gsap";

export default class Lobby extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    alert("COMING SOON...");
  }

  componentDidMount() {
    gsap.from("#lobbyInstructions", {
      duration: 2,
      delay: 0.5,
      x: "101%",
      opacity: 0
    });
  }

  render() {
    return (
      <div id="lobbyDiv">
        <div className="row1">
          <h1 id="lobbyInstructions">Choose your game mode!</h1>
        </div>

        <div className="row2">
          <Link to="/game" id="lobby-nav-link" className="nav-link">
            <NavigationButton id="lobbyNavBtn2">
              <span id="homeNavBtnTitle">Marathon Mode!</span>
            </NavigationButton>
          </Link>

          <Link to="/createGame" id="lobby-nav-link" className="nav-link">
            <NavigationButton id="lobbyNavBtn1">
              <span id="homeNavBtnTitle">Head 2 Head</span>
            </NavigationButton>
          </Link>
        </div>
        <div className="row3">
          <Link to="/" id="lobby-nav-link" className="nav-link">
            <NavigationButton id="lobbyNavBtn3">
              <span id="homeNavBtnTitle">Back</span>
            </NavigationButton>
          </Link>
        </div>
      </div>
    );
  }
}
