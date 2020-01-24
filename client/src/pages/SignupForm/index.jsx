import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "./signup.css";
import {
  FormControl,
  FormLabel,
  Button,
  FormHelperText,
  Input,
  InputLabel,
  Container,
  Typography,
  Grid
} from "@material-ui/core";
import UploadBtn from "../../components/SubmitButton";
import PhotoContainer from "../../components/PhotoContainer";
const images = [
  { src: "Images/Brain.jpg", name: "Brain" },
  { src: "Images/Dex_Lab.jpg", name: "Dexter" },
  { src: "Images/Einstein.jpg", name: "Einstein" },
  { src: "Images/Gadget_Hack.jpg", name: "Gadget" },
  { src: "Images/Gogo_Tamo.jpg", name: "Gogo" },
  { src: "Images/Gretchen.jpg", name: "Gretchen" },
  { src: "Images/Lisa.jpg", name: "Lisa" },
  { src: "Images/Megamind.jpg", name: "Megamind" },
  { src: "Images/Ms_Frizz.jpg", name: "Ms_Frizz" },
  { src: "Images/Prof_X.jpg", name: "Prof_X" },
  { src: "Images/Rick.jpg", name: "Rick" },
  { src: "Images/Velma.jpg", name: "Velma" }
];

export default class SignupForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      photo: "",
      confirmPassword: "",
      redirectTo: null
    };

    // TODO: Write clicked photo to state
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
        password: this.state.password,
        photo: this.state.photo
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
        window.location.href = "./";
      });
  }

  changePhoto(foo) {
    this.setState({ photo: foo });
  }
  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    }
    //TODO: Add photos that when clciked, set this.state.photo to their url
    return (
      <Container fixed>
        <Grid container direction="column" justify="center" alignItems="center">
          <Typography align="center" variant="h2" gutterBottom>
            Signup form
          </Typography>
          <form>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
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
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  aria-describedby="my-password-helper-text"
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="confirmPassword">
                  Confirm Password
                </InputLabel>
                <Input
                  name="confirmPassword"
                  type="password"
                  id="my-password"
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                  aria-describedby="my-password-helper-text"
                />
              </FormControl>
              <Button onClick={this.handleSubmit}>Sign up</Button>
            </Grid>
          </form>
          <Grid container direction="row" justify="center" alignItems="center">
            {images.map(image => (
              <img
                className="photo"
                src={image.src}
                onClick={() => this.changePhoto(image.src)}
              ></img>
            ))}
          </Grid>
          <UploadBtn />
        </Grid>
      </Container>
    );
  }
}
