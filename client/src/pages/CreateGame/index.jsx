import React, { Component } from "react";
import "./createGame.css";
import {
  FormControl,
  Input,
  InputLabel,
  Container,
  Grid,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";
import NavigationButton from "../../components/NavigationButton";

export default class CreateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      createroomname: "",
      joinroomname: "",
      redirectTo: null
    };

    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }



  render() {
    return (
      <div id="createGame">
        <Container fixed width="50%">
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Link to="/lobby" className="nav-link">
              <NavigationButton id="createGameBackBtn">
                <span id="homeNavBtnTitle">Back</span>
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
                  <InputLabel htmlFor="my-input">Create A Room</InputLabel>
                  <Input
                    name="createGame"
                    type="text"
                    id="my-input"
                    value={this.state.createroomname}
                    onChange={this.handleChange}
                    aria-describedby="my-helper-text"
                  />
                </FormControl>
                <Button id="createButton" onClick={this.handleSubmit}>
                  Submit
                </Button>
                <FormControl>
                  <InputLabel htmlFor="my-password">Join A Room</InputLabel>
                  <Input
                    name="joinGame"
                    type="joinGame"
                    id="join-input"
                    value={this.state.joinroomname}
                    onChange={this.handleChange}
                    aria-describedby="my-password-helper-text"
                  />
                </FormControl>
                <Button id="joinButton" onClick={this.handleSubmit}>
                  Submit
                </Button>
              </Grid>
            </form>
          </Grid>
        </Container>
      </div>
    );
  }
}
