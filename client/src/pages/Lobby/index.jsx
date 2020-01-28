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
    gsap.from("#line2", { duration: 2, delay: 1, y: "-150%", opacity: 0 })
    gsap.from("#line3", { duration: 2, delay: 1, y: "150%", opacity: 0 })
    gsap.from("#lobbyinstructions", { duration: 2, delay: 1, x: "-101%", opacity: 0 })
  
  }

  render() {
    return (
      <div id="lobbyDiv">
        <h1 id="lobbyinstructions">Choose your game mode!</h1>

        <div className="container-fluid">
          
          <button id="headtoheadbtn" onClick={this.handleClick}></button>
          
          <Link to="/game" id="lobby-nav-link" className="nav-link">
            <button id="battleroyalebtn"></button>
          </Link>
          <Link to="/" id="lobby-nav-link" className="nav-link">
            <NavigationButton id="lobbybackbtn">
              <span id="homeNavBtnTitle">Back</span>
            </NavigationButton>
          </Link>
          <div id="line1"></div>
          <div id="line2">HEAD TO HEAD</div>
          <div id="line3">BATTLE ROYALE</div>
        </div>
      </div>
    );
  }
}
