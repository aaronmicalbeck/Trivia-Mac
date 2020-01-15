import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./signup.css";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputLabel
} from "@material-ui/core";

export default class SignupForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
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
    // TODO - validate!
    axios
      .post("/auth/signup", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log(response);
        if (!response.data.errmsg) {
          console.log("youre good");
          this.setState({
            redirectTo: "/Home"
          });
        } else {
          console.log("duplicate");
        }
      });
  }
  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    }
    return (
      <div className="SignupForm">
        <h1>Signup form</h1>
        <FormControl>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            name="username"
            type="text"
            id="my-input"
            value={this.state.username}
            onChange={this.handleChange}
            aria-describedby="my-helper-text"
          />
          <FormHelperText id="my-helper-text">
            We'll never share your information.
          </FormHelperText>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            name="password"
            type="password"
            id="password"
            value={this.state.password}
            onChange={this.handleChange}
            aria-describedby="my-password-helper-text"
          />
          <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
          <Input
            name="confirmPassword"
            type="password"
            id="my-password"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            aria-describedby="my-password-helper-text"
          />
          <button onClick={this.handleSubmit}>Sign up</button>
        </FormControl>
      </div>
    );
  }
}
{
  /* <h1>Signup form</h1>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <label htmlFor="confirmPassword">Confirm Password: </label>
        <input
          type="password"
          name="confirmPassword"
          value={this.state.confirmPassword}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>Sign up</button> */
}
