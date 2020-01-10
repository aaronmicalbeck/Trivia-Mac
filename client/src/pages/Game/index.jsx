import React, { Component } from "react";
//import { Header } from '../../components';
import "./game.css";
import socketIOClient from "socket.io-client";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
	  user: props.user,
	  response: false,
	  endpoint: "http://127.0.0.1:8080",
      gameStarted: false,
      gameEnded: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event){
	event.preventDefault();
	console.log("game start button working")
	const {endpoint} = this.state;
	const socket = socketIOClient(endpoint);
	socket.on("FromAPI", data => this.setState({response: data}))

  }

  componentDidMount() {
    console.log("Game Component Mounted");
  }

  render() {
	  const {response} = this.state;
    return (
      <div id="gameDiv">
        <p>Hello Game</p>

        <button id="startGame" onClick={this.handleSubmit}>Start Game</button>
		{response.category}

      </div>
    );
  }
}
