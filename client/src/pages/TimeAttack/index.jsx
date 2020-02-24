////////////////////////////////////////////

import React, { Component } from "react";
import axios from "axios";
import "./style.css";
import socketIOClient from "socket.io-client";
import gsap from "gsap";
import Sound from "react-sound";
import { Link } from "react-router-dom";
import NavigationButton from "../../components/NavigationButton";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

export default class TimeAttack extends Component {
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
      isCorrect: false,
      backgroundColor: "5E91D3",
      time: 5
    };

    console.log(this.state)
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.isCorrectAnswer = this.isCorrectAnswer.bind(this);
    this.headToHeadGamePlay = this.headToHeadGamePlay.bind(this);
    this.renderTime = this.renderTime.bind(this);

  }

  // //////////////////////////////////////////

  renderTime(value) {
    if (value === 0) {
        const score = this.getScore();
        // Updates user score in MongoDB (session score + user topScore)
        if (this.state.user.timeAttackScore < score){
            axios
            .post(`/api/score/${this.state.user._id}`, {
              timeAttackScore: score
            })
            .then(res => console.log(res))
            .catch(err => console.log(err));
      
          // relocates user to Homepage
          window.location.href = "./";
        }
        else {
            window.location.href = "./";
        }
       
        // Updates user score in MongoDB
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


  headToHeadGamePlay() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);

    socket.on("FromAPI2", data =>
      this.setState({
        //enable the button when data comes in unless...
        enableButton: this.state.enableButton
          ? true
          : //the question has already been answered. else, leave it enabled
          this.state.response.question === data.question
          ? this.headToHeadGamePlay()
          : true,
        response: data,
        isCorrect:
          this.state.correct_answer !== data.correct_answer ? false : true,
        correct_answer: data.correct_answer,
        isPlaying: true,
        gameStarted: true
      })
    );
  }

  // //////////////////////////////////////////

  handleStart(event) {
    event.preventDefault();

    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("connectToRoom", function(data) {
      document.body.innerHTML = "";
      document.write(data);
    });

    // GAMESTARTED = TRUE

    this.setState({ gameStarted: true });
  }

  getScore() {
    return this.state.sessionScore;
  }

  handleStop(event) {
    event.preventDefault();

    const score = this.getScore();

    // Updates user score in MongoDB (session score + user topScore)

    if (this.state.user.timeAttackScore < score){

        axios
        .post(`/api/score/${this.state.user._id}`, {
          timeAttackScore: score
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
  
      // relocates user to Homepage
      window.location.href = "./";
    }

    else {
        window.location.href = "./";
    }

   
    // Updates user score in MongoDB 

  }

  isCorrectAnswer(choice) {
    if (this.state.enableButton) {
      const { response } = this.state;
      let { sessionScore } = this.state;

      // Buttons are disabled when user selects an answer

      if (choice === response.correct_answer) {
        this.setState({
          sessionScore: sessionScore + 1,
          enableButton: false
        });
        this.headToHeadGamePlay();
      } else {
        this.setState({
          sessionScore: sessionScore - 1
        });
      }
    }
  }

  componentDidMount() {
    /////////////
    // on load
    /////////////

    // on load fade start button in
    gsap.from("#smackdownDiv", { duration: 2, delay: 0.1, opacity: 0 });

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
      <div id="smackdownDiv">
        <Sound
          url="https://vgmdownloads.com/soundtracks/pokemon-red-green-blue-yellow/figvtmqo/54%20Final%20Battle%21%20%28Rival%29.mp3"
          playStatus={Sound.status.PLAYING}
          loop={true}
        />

        <div className="gameRow1">
          <button id="startGame" onClick={this.headToHeadGamePlay}>
            Start Game
          </button>

          <button id="endGame" onClick={this.handleStop}>
            Stop Game{" "}
          </button>
        </div>

        <div id="gameRow2"></div>
        <div className="App">
            <CountdownCircleTimer
              className="countdown"
              // key={this.state.correct_answer}
              isPlaying={this.state.isPlaying}
              durationSeconds={this.state.time}
              colors={[["#aebd38", 0.33], ["#d17600", 0.33], ["#c70606"]]}
              renderTime={this.renderTime}
              onComplete={() => [false, 0]}
              trailColor={true}
              size={160}
            />
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
         
        </div>
      </div>
    );
  }
}
