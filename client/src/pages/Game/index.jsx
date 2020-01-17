import React, { Component } from "react";
// import { Header } from '../../components';
import "./game.css";
import socketIOClient from "socket.io-client";
import gsap from "gsap";

export default class Game extends Component {
  constructor(props) {
    super(props);

    const PORT = process.env.PORT ? process.env.PORT: "8080" 

    const endpoint = (process.env.NODE_ENV === "production") ? `https://trivia-mac.herokuapp.com:${PORT}` :
    "127.0.0.1:8080"
    this.state = {
      
      user: props.user,
      response: false,
      endpoint,
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

  handleStop(event) {
    event.preventDefault();
    console.log("game stop button working")

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
    /////////////
    // on load
    /////////////

    // on load fade start button in.
    gsap.from("#startGame", { duration: 1, delay: 0.1, opacity: 0 });
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

    
        {renderButtons()}
        <br></br>
        <p id="score">Score: {sessionScore}</p>
        <button id="endGame" onClick={this.handleStop}>Stop Game </button>
      </div>
    );
  }
}
