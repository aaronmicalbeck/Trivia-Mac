import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import SignupForm from "./pages/SignupForm";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Lobby from "./pages/Lobby";
import Leaderboard from "./pages/Leaderboard";
import Game from "./pages/Game";
import QuestionSubmission from "./pages/QuestionSubmission";
import HeadToHeadGame from "./pages/HeadToHead";
import CreateGame from "./pages/CreateGame";
import TimeAttack from "./pages/TimeAttack";

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: 0,
      endpoint: "http://127.0.0.1:8080"
    };

    this._login = this._login.bind(this);
    this._logout = this._logout.bind(this);
    this.failedLogin = this.failedLogin.bind(this);
  }


  _failedLogin(){
    this.setState({failedLogin: true})
  }

  componentDidMount() {
    axios.get("/auth/user").then(response => {
      if (!!response.data.user) {
        this.setState({
          loggedIn: true,
          user: response.data.user
        });
        axios
          .get(`/api/userscore/${this.state.user._id}`)

          .then(res => {
            this.setState({
              user: res.data
            });
          })
          .catch(err => console.log(err))
      } else {
        this.setState({
          loggedIn: false,
          user: null
        });
      }
    });
  }

  _logout(event) {
    event.preventDefault();
    axios.post("/auth/logout").then(response => {
      if (response.status === 200) {
        this.setState({
          loggedIn: false,
          user: null
        });
      }
    });
  }

  failedLogin() {
    let failed = document.getElementById("wrong");
    if (failed.style.display === "none") {
      failed.style.display = "block";
    } else {
      failed.style.display = "none";
    }
  }

  _login(username, password) {
    axios
      .post("/auth/login", {
        username,
        password
      })
      .then(response => {
        if (response.status === 200) {
          this.setState({
            loggedIn: true,
            user: response.data.user
          });
        } else {
          this.failedLogin();
        }
      });
  }

  render() {
    return (
      <div className="">
        <Route
          exact
          path="/"
          render={() => (
            <Home
              user={this.state.user}
              _login={this._login}
              _logout={this._logout}
            />
          )}
        />
        <Route
          exact
          path="/game"
          render={() => <Game user={this.state.user} />}
        />
        <Route
          exact
          path="/createGame"
          render={() => <CreateGame user={this.state.user} />}
        />
        <Route
          exact
          path="/headtohead"
          render={() => <HeadToHeadGame user={this.state.user} />}
        />
        <Route
          exact
          path="/timeattack"
          render={() => <TimeAttack user={this.state.user} />}
        />

        <Route exact path="/signup" component={SignupForm} />
        <Route
          exact
          path="/profile"
          render={() => <Profile user={this.state.user} _login={this._login} />}
        />
        <Route exact path="/lobby" component={Lobby} user={this.state.user} />
        <Route exact path="/leaderboard" component={Leaderboard} />
        <Route
          exact
          path="/questionSubmission"
          component={QuestionSubmission}
        />
      </div>
    );
  }
}

export default App;
