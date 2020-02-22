import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import googleButton from "./google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png";
import {
  FormControl,
  Input,
  InputLabel,
  Container,
  Grid,
  Button
} from "@material-ui/core";
import "./login.css";
import Expand from "../../components/Expand";
import { Link } from "react-router-dom";
import NavigationButton from "../../components/NavigationButton";
import gsap from "gsap";


export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirectTo: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkForm = this.checkForm.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  checkForm = () =>{
    if (this.state.username === ""){
      alert("Please fill out the login form completely!")
    }
    else if (this.state.password === ""){
      alert("Please fill out the login form completely")
    }
    else{
      this.props._login(this.state.username, this.state.password);
      this.setState({

      redirectTo: "/"
    })
    }
  }
  

  handleSubmit(event) {
    event.preventDefault();
    this.checkForm();
  }

  componentDidMount() {
    gsap.from("#LoginForm", { duration: 2, delay: 1, y: "-101%", opacity: 0 });
    gsap.from("#welcomeMessage1", {
      duration: 2,
      delay: 1,
      x: "-101%",
      opacity: 0
    });
    gsap.from("#welcomeMessage2", {
      duration: 2,
      delay: 1,
      x: "101%",
      opacity: 0
    });
  }

  render() {

    let {_failedLogin} = this.state;

    const renderModal = () =>{
      if (_failedLogin === true){
        return <h3>TRY AGAIN</h3>
      }
      else {
        return null;
      }

    }
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div id="expand">
          <div id="welcomeMessage">
            <h1 id="welcomeMessage1">Welcome To</h1>
            <h1 id="welcomeMessage2">TRIVIA - MAC</h1>
          </div>

          <div id="LoginForm">
            <Container fixed width="50%">
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Link to="/signup" className="nav-link">
                  <NavigationButton>
                    <span id="homeNavBtnTitle">Register</span>
                  </NavigationButton>
                </Link>
                <form>
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <FormControl>
                      <InputLabel htmlFor="my-input">Username</InputLabel>
                      <Input
                        name="username"
                        type="text"
                        id="my-input"
                        value={this.state.username}
                        onChange={this.handleChange}
                        aria-describedby="my-helper-text"
                      />
                    </FormControl>
                    <FormControl>
                      <InputLabel htmlFor="my-password">Password</InputLabel>
                      <Input
                        name="password"
                        type="password"
                        id="my-password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        aria-describedby="my-password-helper-text"
                      />
                    </FormControl>
                    <Button id="loginButton" onClick={this.handleSubmit}>
                      Login
                    </Button>
                    {renderModal()}
                    <a href="/auth/google">
                      {/* <GoogleButton /> */}
                      <img src={googleButton} alt="sign into Google Button" />
                    </a>
                  </Grid>
                  
                </form>
                <br></br>
                <h1>LeaderBoard</h1>
              </Grid>
              <div id="expandrow">
                <Expand />
              </div>
            </Container>
          </div>
        </div>
      );
    }
  }
}
