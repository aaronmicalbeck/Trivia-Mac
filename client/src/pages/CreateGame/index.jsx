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
import { EditorFormatColorReset } from "material-ui/svg-icons";
import socketIOClient from "socket.io-client";

export default class CreateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      createroomname: "",
      joinroomname: "",
      redirectTo: null,
      roomCreated: false,
      roomJoined: false,
      rooms: [],
      playerWaiting: false
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCreateRoom = this.handleCreateRoom.bind(this);
    this.handleJoinRoom = this.handleJoinRoom.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleCreateRoom(event) {
    event.preventDefault();
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("createRoom", data => this.setState({ roomCreated: true }));
    socket.on("getRoomNames", data => this.setState({ rooms: data }));
  }
  handleJoinRoom(event) {
    event.preventDefault();
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("joinRoom", data => this.setState({ roomJoined: true }));
    socket.on("ready", data => this.setState({ playerWaiting: true }));
    window.location.href = "./headtohead";
  }
  render() {
    const renderRoom = () => {
      if (this.state.roomCreated) {
        return (
          <Button
            id={this.state.createroomname}
            onClick={() => {
              this.handleJoinRoom();
            }}
          >
            {this.state.createroomname}
          </Button>
        );
      }
    };
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
                    name="createroomname"
                    type="text"
                    id="my-input"
                    value={this.state.createroomname}
                    onChange={this.handleChange}
                    aria-describedby="my-helper-text"
                  />
                </FormControl>
                <Button id="createButton" onClick={this.handleCreateRoom}>
                  Create Room
                </Button>
                {/* <FormControl>
                  <InputLabel htmlFor="join-input">Join A Room</InputLabel>
                  <Input
                    name="joinGame"
                    type="joinGame"
                    id="join-input"
                    value={this.state.joinroomname}
                    onChange={this.handleChange}
                    aria-describedby="my-helper-text"
                  />
                </FormControl> */}
                {/* <Button id="joinButton" onClick={this.handleSubmit}>
                  Join Room
                </Button> */}
                <Container id="roomsAvailable">{renderRoom()}</Container>
              </Grid>
            </form>
          </Grid>
        </Container>
      </div>
    );
  }
}
