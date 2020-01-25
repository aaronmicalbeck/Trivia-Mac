import React, { Component } from "react";
//import { Header } from '../../components';
import "./lobby.css";
import { Link } from "react-router-dom";
import NavigationButton from "../../components/NavigationButton";

export default class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user
	};

this.handleClick = this.handleClick.bind(this);	
	
  }

  handleClick(event){
	  event.preventDefault();
	  alert('COMING SOON...');
	  
  }

  componentDidMount() {


  }

  render() {
    return (
      <div>
        <Link to="/" className="nav-link">
		 <NavigationButton/>
        </Link>

        <Link to="/game" className="nav-link">
          Battle Royale!
        </Link>

		<button id = "headtoheadbtn" onClick = {this.handleClick}> Head to Head!</button>
      </div>
    );
  }
}
