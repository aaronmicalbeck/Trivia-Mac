import React, { Component } from 'react';
//import { Header } from '../../components';
import "./game.css";
import broadcastQuestion from "../../utils/triviaAPI";
// import questionApi from "../../utils/questionAPI";

export default class Game extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: props.user
		}

		setInterval(broadcastQuestion, 2000)
	}

	componentDidMount() {
		console.log("Game Component Mounted")

	}

	render() {
		return <p>Hello Game</p>
	}

}
