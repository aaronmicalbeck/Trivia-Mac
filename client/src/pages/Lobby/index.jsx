import React, { Component } from 'react';
//import { Header } from '../../components';
import "./lobby.css";

export default class Lobby extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: props.user
		}
	}

	componentDidMount() {
		console.log("Lobby Component Mounted")
	}

	render() {
		return <p>Hello Lobby</p>
	}

}
