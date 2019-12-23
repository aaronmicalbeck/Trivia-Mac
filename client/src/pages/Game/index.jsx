import React, { Component } from 'react';
//import { Header } from '../../components';
import "./game.css";

export default class Game extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: props.user
		}
	}

	componentDidMount() {
		console.log("Game Component Mounted")
	}

	render() {
		return <p>Hello Game</p>
	}

}
