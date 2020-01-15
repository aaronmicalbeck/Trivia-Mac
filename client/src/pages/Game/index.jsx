import React, { Component } from "react";
import axios from "axios";
// import { Header } from '../../components';
import "./game.css";
import socketIOClient from "socket.io-client";
//import { response } from "express";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      response: false,
      endpoint: "http://127.0.0.1:8080",
      gameStarted: false,
      gameEnded: false,
      sessionScore: 0
    };
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.isCorrectAnswer = this.isCorrectAnswer.bind(this);
  }

  handleStart(event) {
    event.preventDefault();
    console.log("game start button working");
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({ response: data }));

    this.setState({ gameStarted: true });
    console.log(this.state.gameStarted);
  }

  getScore(){
    return this.state.sessionScore;
  }

  handleStop(event) {
    event.preventDefault();
    console.log("game stop button working");
    const score = this.getScore()

    axios.post(`/api/score/${this.state.user._id}`, score)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  isCorrectAnswer(choice) {
    const { response } = this.state;
    let { sessionScore } = this.state;

    if (choice === response.correct_answer) {
      alert("Correct!");
      this.setState({ sessionScore: sessionScore + 1 });
    } else {
      alert("Wrong!");
      this.setState({ sessionScore: sessionScore - 1 });
    }
  }

  componentDidMount() {
    console.log("Game Component Mounted");
  }

  render() {
    const { response } = this.state;
    let { sessionScore } = this.state;
    const renderButtons = () => {
      if (this.state.gameStarted && response.choices) {
        return response.choices.map(answers => <button id="answers" onClick={() => this.isCorrectAnswer(answers)}>{answers}</button>)
      }
    }
    return (
      <div id="gameDiv">
        <p>Hello Game</p>

        <button id="startGame" onClick={this.handleStart}>
          Start Game
        </button>
        <br></br>

        {response.category}
        <br></br>
        {response.difficulty}
        <br></br>
        {response.question}
        <br></br>

        {console.log(response.choices)}
        {renderButtons()}
        <br></br>
        <p id="score">Score: {sessionScore}</p>
        <button id="endGame" onClick={this.handleStop}>Stop Game </button>
      </div>
    );
  }
}
