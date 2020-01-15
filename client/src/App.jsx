import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Lobby from "./pages/Lobby";
import Leaderboard from "./pages/Leaderboard";
import Game from "./pages/Game";
import QuestionSubmission from "./pages/QuestionSubmission";
import { NavBar } from "./components";

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
        {/* Navbar on every page */}
        <NavBar _logout={this._logout} loggedIn={this.state.loggedIn} />
        {/*  Individual Things */}
        <Route
          exact
          path="/"
          render={() => <Home user={this.state.user} _login={this._login} />}
        />

        <Route exact path="/signup" component={SignupForm} />
        <Route
          exact
          path="/profile"
          render={() => <Profile user={this.state.user} _login={this._login} />}
        />
        <Route exact path="/lobby" component={Lobby} />
        <Route exact path="/game" component={Game} />
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
