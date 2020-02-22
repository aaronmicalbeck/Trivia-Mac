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
      createGame: "",
      joinGame: "",
      redirectTo: null
    };
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
              <NavigationButton>
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
                  <InputLabel htmlFor="my-input">Create</InputLabel>
                  <Input
                    name="createGame"
                    type="text"
                    id="my-input"
                    value={this.state.createGame}
                    onChange={this.handleChange}
                    aria-describedby="my-helper-text"
                  />
                </FormControl>
                <Button id="createButton" onClick={this.handleSubmit}>
                  Create
                </Button>
                <FormControl>
                  <InputLabel htmlFor="my-password">Join</InputLabel>
                  <Input
                    name="joinGame"
                    type="text"
                    id="my-input"
                    value={this.state.joinGame}
                    onChange={this.handleChange}
                    aria-describedby="my-helper-text"
                  />
                </FormControl>
                <Button id="joinButton" onClick={this.handleSubmit}>
                  Join
                </Button>
              </Grid>
            </form>
          </Grid>
        </Container>
      </div>
    );
  }
}
