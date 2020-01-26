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
    
    gsap.from("#line1", { duration: 2, delay: 1, x: "101%", opacity: 0 })


    gsap.from("#lobbyinstructions", { duration: 2, delay: 1, x: "-101%", opacity: 0 })
  }

  render() {
    return (
      <div id="lobbyDiv">
        <h1 id="lobbyinstructions">Choose your game mode!</h1>
        <div className="container-fluid">
          
          <button id="headtoheadbtn" onClick={this.handleClick}></button>
          
          <Link to="/game" className="nav-link">
            <button id="battleroyalebtn"></button>
          </Link>
          <Link to="/" className="nav-link">
            <NavigationButton id="backbtn">
              <span id="homeNavBtnTitle">Back</span>
            </NavigationButton>
          </Link>
          <div id="line1"></div>
        </div>
      </div>
    );
  }
}
