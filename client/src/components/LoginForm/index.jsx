import React from "react";
import "./login.css";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputLabel,
  Container
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
// import googleButton from './google_signin_buttons/web/1x/btn_google_signin_dark_disabled_web.png'
import googleButton from "./google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png";

// function constructor() {
//   super();
//   this.state = {
//     username: "",
//     password: "",
//     redirectTo: null
//   };
//   // this.googleSignin = this.googleSignin.bind(this)
//   this.handleSubmit = this.handleSubmit.bind(this);
//   this.handleChange = this.handleChange.bind(this);
// }

// function handleChange(event) {
//   this.setState({
//     [event.target.name]: event.target.value
//   });
// }

// function handleSubmit(event) {
//   event.preventDefault();
//   console.log("handleSubmit");
//   this.props._login(this.state.username, this.state.password);
//   this.setState({
//     redirectTo: "/"
//   });
// }

function LoginForm() {
  return (
    <div>
      <FormControl>
        <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input
          type="username"
          id="my-input"
          aria-describedby="my-helper-text"
        />
        <FormHelperText id="my-helper-text">
          We'll never share your email.
        </FormHelperText>
        <InputLabel htmlFor="my-password">Password</InputLabel>
        <Input
          type="password"
          id="my-password"
          aria-describedby="my-password-helper-text"
        />
        <a href="/auth/google">
          {/* <GoogleButton /> */}
          <img src={googleButton} alt="sign into Google Button" />
        </a>
      </FormControl>
    </div>
  );
}
export { LoginForm };
