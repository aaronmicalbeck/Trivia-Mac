import React from "react";
import "./login.css";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel
} from "@material-ui/core";

import googleButton from "./google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png";


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
        
          <img src={googleButton} alt="sign into Google Button" />
        </a>
      </FormControl>
    </div>
  );
}
export { LoginForm };
