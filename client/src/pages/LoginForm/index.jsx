import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import googleButton from "./google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Container,
  Grid,
  Button
} from "@material-ui/core";
import "./login.css";
import gsap from "gsap";
import Expand from "../../components/Expand";

export default class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      redirectTo: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props._login(this.state.username, this.state.password);
    this.setState({
      redirectTo: "/"
    });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div id="LoginForm">
          <Container fixed>
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
              <Button onClick={this.handleSubmit}>Login</Button>
              <a href="/auth/google">
                {/* <GoogleButton /> */}
                <img src={googleButton} alt="sign into Google Button" />
              </a>
            </Grid>
            <Expand />
          </Container>
        </div>
      );
    }
  }
}
