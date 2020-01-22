import React, { Component } from "react";
import axios from "axios";
// import { Header } from '../../components';
import "./game.css";
import socketIOClient from "socket.io-client";
import Countdown from "react-countdown";
import gsap from "gsap";


export default class Game extends Component {
  constructor(props) {
    super(props);

    const PORT = process.env.PORT ? process.env.PORT : "8080"

    const endpoint = (process.env.NODE_ENV === "production") ? `https://trivia-mac.herokuapp.com` :
      "127.0.0.1:8080"
    this.state = {

      user: props.user,
      response: false,
      endpoint,
      enableButton: true,
      gameStarted: false,
      gameEnded: false,
      sessionScore: 0,
      correct_answer: "",
      time: Date.now()
    };
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.isCorrectAnswer = this.isCorrectAnswer.bind(this);
  }

  handleStart(event) {
    event.preventDefault();
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({
      //enable the button when data comes in unless...
      enableButton: this.state.enableButton ?
        true :
        //the question has already been answered. else, leave it enabled
        this.state.response.question === data.question ?
          false :
          true,
      response: data,
      time: this.state.correct_answer != data.correct_answer ? Date.now() + 10000 : this.state.time,
      correct_answer: data.correct_answer

    }));
    this.setState({ gameStarted: true });
  }

  getScore() {
    return this.state.sessionScore;
  }

  handleStop(event) {
    event.preventDefault();

    const score = this.getScore();



    axios.post(`/api/score/${this.state.user._id}`, { topScore: this.state.user.topScore + score })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    window.location.href = './';
  }

  isCorrectAnswer(choice) {
    if (this.state.enableButton) {
      const { response } = this.state;
      let { sessionScore } = this.state;

      if (choice === response.correct_answer) {
        this.setState({ sessionScore: sessionScore + 1, enableButton: false });
      } else {
        this.setState({ sessionScore: sessionScore - 1, enableButton: false });
      }
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
        console.log(res)
      })
      .catch(err => console.log(err));
  }

  // componentShouldUpdate() {
  //   document.getElementById("answers").disabled = false;
  // }

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
        return response.choices.map(answers => <button disabled={!this.state.enableButton} id="answers" onClick={() => { this.isCorrectAnswer(answers) }}>{this.decodeHtml(answers)}</button>)
      }
    }
    return (
      <div id="gameDiv">
        <button id="startGame" onClick={this.handleStart}>
          Start Game
        </button>
        <Countdown
          date={this.state.time}
          intervalDelay={0}
          precision={0}
          renderer={props => <div>{props.total/1000}</div>}
        />

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
