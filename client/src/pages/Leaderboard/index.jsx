import React, { Component } from 'react';
//import { Header } from '../../components';
import "./leaderboard.css";
import BarChart from "../../components/BarChart";

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
		return (
		
		<div id="leaderBoard">
		<p>Hello Leaderboard</p>
		<BarChart/>
		</div>
		)
	}

}
