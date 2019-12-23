import React, { Component } from 'react';
//import { Header } from '../../components';
import "./leaderboard.css";

export default class Leaderboard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: props.user
		}
	}

	componentDidMount() {
		console.log("Leaderboard Component Mounted")
	}

	render() {
		return <p>Hello Leaderboard</p>
	}

}
