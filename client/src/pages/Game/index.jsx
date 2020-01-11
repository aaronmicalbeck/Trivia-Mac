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
      gameStarted: false,
      gameEnded: false,
      sessionScore: 0
    };
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.correctAnswer = this.correctAnswer.bind(this);
    this.wrongAnswer = this.wrongAnswer.bind(this);
  }

  handleStart(event) {
    event.preventDefault();
    console.log("game start button working")
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({ response: data }))

  }

  handleStop(event) {
    event.preventDefault();
    console.log("game stop button working")

  }

  correctAnswer() {
    alert("Correct!");
    let { sessionScore } = this.state;
    console.log(this.state.sessionScore);
    this.setState({ sessionScore: sessionScore + 1});
  }

  wrongAnswer() {
    alert("Wrong!");
    let { sessionScore } = this.state;
    this.setState({ sessionScore: sessionScore - 1 });
  }

  componentDidMount() {
    console.log("Game Component Mounted");
  }

  render() {
    const { response } = this.state;
    let { sessionScore } = this.state;
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
        <button id="correct" onClick={this.correctAnswer}>{response.correct_answer}</button>
        <br></br>
        <button id="wrong1" onClick={this.wrongAnswer}>{response.incorrect_answers && response.incorrect_answers[0]}</button>
        <br></br>
        <button id="wrong2" onClick={this.wrongAnswer}>{response.incorrect_answers && response.incorrect_answers[1]}</button>
        <br></br>
        <button id="wrong3" onClick={this.wrongAnswer}>{response.incorrect_answers && response.incorrect_answers[2]}</button>
        <br></br>

        <p id="score">Score: {sessionScore}</p>

        <button id="endGame" onClick={this.handleStop}>Stop Game </button>

      </div>
    );
  }
}
