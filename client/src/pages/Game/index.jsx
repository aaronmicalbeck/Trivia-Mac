import React, { Component } from "react";
// import { Header } from '../../components';
import "./game.css";
import socketIOClient from "socket.io-client";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
	  user: props.user,
	  response: false,
	  endpoint: "http://127.0.0.1:8080",
      gameOn: false,
	  gameOff: true,
	  sessionScore: 0
    };
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleStart(event){
	event.preventDefault();
	console.log("game start button working")
	this.setState({gameOn: true})
	this.setState({gameOff: false})
	const {endpoint} = this.state;
	const socket = socketIOClient(endpoint);
	socket.on("FromAPI", data => this.setState({response: data}))

  }

  handleStop(event){
	  event.preventDefault();
	  console.log("game stop button working")
	  this.setState({gameOn: false})
	  this.setState({gameOff: true})
	  const {endpoint} = this.state;
	  const socket = socketIOClient(endpoint);
	  socket.disconnect();
  }

  componentDidMount() {
    console.log("Game Component Mounted");
  }

  render() {
	  const {response} = this.state;
	  const {sessionScore} = this.state;
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
		<button id="correct">{response.correct_answer}</button>
		<br></br>
		<button id="incorrect">{response.incorrect_answers && response.incorrect_answers[0]}</button>
    <br></br>
    <button id="incorrect">{response.incorrect_answers && response.incorrect_answers[1]}</button>
    <br></br>
    <button id="incorrect">{response.incorrect_answers && response.incorrect_answers[2]}</button>
    <br></br>
	<br></br>
	

		<button id="endGame" onClick={this.handleStop}>Stop Game</button>

		<p id="score"> HELLO YOUR SCORE IS: {sessionScore} </p>

      </div>
    );
  }
}
