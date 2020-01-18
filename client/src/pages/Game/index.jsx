import React, { Component } from "react";
import axios from "axios";
// import { Header } from '../../components';
import "./game.css";
import socketIOClient from "socket.io-client";

import gsap from "gsap";


export default class Game extends Component {
  constructor(props) {
    super(props);

    const PORT = process.env.PORT ? process.env.PORT: "8080" 

    const endpoint = (process.env.NODE_ENV === "production") ? `https://trivia-mac.herokuapp.com` :
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
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({ response: data }));

    this.setState({ gameStarted: true });
  }

  getScore(){
    return this.state.sessionScore;
  }

  handleStop(event) {
    event.preventDefault();
   
    const score = this.getScore();
    

    axios.post(`/api/score/${this.state.user._id}`, {topScore: this.state.user.topScore + score})
    
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
    /////////////
    // on load
    /////////////

    // on load fade start button in.
    gsap.from("#startGame", { duration: 1, delay: 0.1, opacity: 0 });

      axios.get(`/api/userscore/${this.state.user._id}`)
      .then(res => {
        this.setState({
          user: res.data
        })
        console.log(res)})
      .catch(err => console.log(err));
  }

  decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

  render() {
    const { response } = this.state;
    let { sessionScore } = this.state;

    const renderButtons = () => {
      if (this.state.gameStarted && response.choices) {
        return response.choices.map(answers => <button id="answers" onClick={() => this.isCorrectAnswer(answers)}>{this.decodeHtml(answers)}</button>)
      }
    }
    return (
      <div id="gameDiv">
        <button id="startGame" onClick={this.handleStart}>
          Start Game
        </button>
        <br></br>
        <p>Category: {response.category}</p>
        <br></br>
        <p>Difficulty: {response.difficulty}</p>
        <br></br>
        <p>{this.decodeHtml(response.question)}</p>
        <br></br>

    
        {renderButtons()}
        <br></br>
        <p id="score">Score: {sessionScore}</p>
        <button id="endGame" onClick={this.handleStop}>Stop Game </button>
      </div>
    );
  }
}
