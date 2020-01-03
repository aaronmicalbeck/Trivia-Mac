import React, { Component } from 'react';
//import { Header } from '../../components';
import "./game.css";
import broadcastQuestion from "../../utils/triviaAPI";
import questionAPI from "../../utils/questionAPI";

export default class Game extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: props.user
		}
	}

	componentDidMount() {
		console.log("Game Component Mounted")
		broadcastQuestion();

	}

	render() {
		return <p>Hello Game</p>
	}

}
