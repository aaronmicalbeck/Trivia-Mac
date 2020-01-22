import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import googleButton from "./google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel
} from "@material-ui/core";
import "./login.css";

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
        <FormControl>
          <InputLabel htmlFor="my-input">Username or Email Address</InputLabel>
          <Input
            name="username"
            type="text"
            id="my-input"
            value={this.state.username}
            onChange={this.handleChange}
            aria-describedby="my-helper-text"
          />
          <FormHelperText id="my-helper-text">
            We'll never share your email.
          </FormHelperText>
          <InputLabel htmlFor="my-password">Password</InputLabel>
          <Input
            name="password"
            type="password"
            id="my-password"
            value={this.state.password}
            onChange={this.handleChange}
            aria-describedby="my-password-helper-text"
          />
          <button onClick={this.handleSubmit}>Login</button>
          <a href="/auth/google">
            <img src={googleButton} alt="sign into Google Button" />
          </a>
        </FormControl>
      );
    }
  }
}
