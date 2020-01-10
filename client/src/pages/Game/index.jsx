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
    this.handleStart = this.handleStart.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleStart(event){
	event.preventDefault();
	console.log("game start button working")
	const {endpoint} = this.state;
	const socket = socketIOClient(endpoint);
	socket.on("FromAPI", data => this.setState({response: data}))

  }

  handleStop(event){
	  event.preventDefault();
	  console.log("game stop button working")

  }

  componentDidMount() {
    console.log("Game Component Mounted");
  }

  render() {
	  const {response} = this.state;
    return (
      <div id="gameDiv">
        <p>Hello Game</p>

        <button id="startGame" onClick={this.handleStart}>Start Game</button>
		<br></br>
		
		{response.category}
		<br></br>
		{response.difficulty}
		<br></br>
		{response.question}
		<br></br>
		{response.correct_answer}
		<br></br>
		{response.incorrect_answers}
		<br></br>

		<button id="endGame" onClick={this.handleStop}>Stop Game </button>

      </div>
    );
  }
}
