import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
<<<<<<< HEAD
//import LoginForm from "./pages/LoginForm";
=======
>>>>>>> 7682bda1e9e754872919ba80fdc645a69d7365b8
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
      endpoint: "http://127.0.0.1:8080",

      labels: ['January', 'February', 'March',
           'April', 'May'],
      datasets: [
    {
      label: 'Rainfall',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56]
    }
  ]
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
        <Route
          exact
          path="/game"
          render={() => <Game user={this.state.user} />}
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
