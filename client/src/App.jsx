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

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: 0,
      endpoint: "http://127.0.0.1:8080"
    };

    this._login = this._login.bind(this);
    this._logout = this._logout.bind(this);
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
          .catch(err => console.log(err));
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

        <Route exact path="/signup" component={SignupForm} />
        <Route
          exact
          path="/profile"
          render={() => <Profile user={this.state.user} _login={this._login} />}
        />
        <Route exact path="/lobby" component={Lobby} />
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
