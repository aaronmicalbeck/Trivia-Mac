////////////////////////////////////////////

import React, { Component } from "react";
import axios from "axios";
import "./game.css";
import socketIOClient from "socket.io-client";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import gsap from "gsap";
import Sound from "react-sound";
import { Link } from "react-router-dom";
import NavigationButton from "../../components/NavigationButton";

export default class Game extends Component {
  constructor(props) {
    super(props);

    const endpoint =
      process.env.NODE_ENV === "production"
        ? `https://trivia-mac.herokuapp.com`
        : "127.0.0.1:8080";

    this.state = {
      user: props.user,
      response: false,
      endpoint,
      enableButton: true,
      gameStarted: false,
      gameEnded: false,
      sessionScore: 0,
      correct_answer: "",
      isPlaying: false,
      time: 10,
      backgroundColor: "5E91D3"
    };
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.isCorrectAnswer = this.isCorrectAnswer.bind(this);
    this.renderTime = this.renderTime.bind(this);
  }

  renderTime(value) {
    if (value === 0) {
      return <div className="timer">Too late...</div>;
    }

    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">{value}</div>
        <div className="text">seconds</div>
      </div>
    );
  }

  // //////////////////////////////////////////

  // //////////////////////////////////////////

  handleStart(event) {
    event.preventDefault();
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);

    socket.on("FromAPI", data =>
      this.setState({
        //enable the button when data comes in unless...
        enableButton: this.state.enableButton
          ? true
          : //the question has already been answered. else, leave it enabled
          this.state.response.question === data.question
          ? false
          : true,
        response: data,
        time:
          this.state.correct_answer !== data.correct_answer
            ? 10
            : this.state.time,
        correct_answer: data.correct_answer,
        isPlaying: true,
        backgroundColor: this.state.enableButton
          ? "#505160"
          : //the question has already been answered. else, leave it enabled
          this.state.response.question === data.question
          ? this.state.backgroundColor
          : "#505160"
      })
    );

    // GAMESTARTED = TRUE

    this.setState({ gameStarted: true });
  }

  getScore() {
    return this.state.sessionScore;
  }

  handleStop(event) {
    event.preventDefault();

    // session score
    const score = this.getScore();

    // Updates user score in MongoDB (session score + user topScore)

    axios
      .post(`/api/score/${this.state.user._id}`, {
        topScore: this.state.user.topScore + score
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));

    // relocates user to Homepage
    window.location.href = "./";
  }

  isCorrectAnswer(choice) {
    if (this.state.enableButton) {
      const { response } = this.state;
      let { sessionScore } = this.state;

      // Buttons are disabled when user selects an answer

      if (choice === response.correct_answer) {
        this.setState({
          sessionScore: sessionScore + 1,
          enableButton: false,
          backgroundColor: "green"
        });
      } else {
        this.setState({
          sessionScore: sessionScore - 1,
          enableButton: false,
          backgroundColor: "red"
        });
      }
    }
  }

  componentDidMount() {
    /////////////
    // on load
    /////////////

    // on load fade start button in
    gsap.from("#gameDiv", { duration: 2, delay: 0.1, opacity: 0 });

    axios
      .get(`/api/userscore/${this.state.user._id}`)

      .then(res => {
        this.setState({
          user: res.data
        });
      })
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
        return response.choices.map(answers => (
          <button
            disabled={!this.state.enableButton}
            id="answers"
            style={{ backgroundColor: this.state.backgroundColor }}
            onClick={() => {
              this.isCorrectAnswer(answers);
            }}
          >
            {this.decodeHtml(answers)}
          </button>
        ));
      }
    };
    return (
      <div id="gameDiv">
        {/* <Grid container direction="row" justify="center" alignItems="center"> */}
        <Sound
          url="http://23.237.126.42/ost/wii-console-background-music/sopjflrm/Mii%20Channel%20-%20Plaza%20Music.mp3"
          playStatus={Sound.status.PLAYING}
          loop={true}
        />

        <div className="gameRow1">
          <button id="startGame" onClick={this.handleStart}>
            Start Game
          </button>

          <button id="endGame" onClick={this.handleStop}>
            Stop Game{" "}
          </button>
        </div>

        <div id="gameRow2">
          <div className="App">
            <CountdownCircleTimer
              className="countdown"
              key={this.state.correct_answer}
              isPlaying={this.state.isPlaying}
              durationSeconds={this.state.time}
              colors={[["#aebd38", 0.33], ["#d17600", 0.33], ["#c70606"]]}
              renderTime={this.renderTime}
              onComplete={() => [true, 0]}
            />
          </div>
        </div>

        <div id="gameRow3">
          <br></br>
          <p>Category: {response.category}</p>
          <br></br>
          <p>{this.decodeHtml(response.question)}</p>
          <br></br>

          {renderButtons()}
          <br></br>
          <p id="score">Score: {sessionScore}</p>
        </div>

        <div id="gameRow4">
          <Link to="/lobby" className="nav-link">
            <NavigationButton id="gameBackBtn">
              <span id="homeNavBtnTitle">Back</span>
            </NavigationButton>
          </Link>
        </div>

        {/* </Grid> */}
      </div>
    );
  }
}
