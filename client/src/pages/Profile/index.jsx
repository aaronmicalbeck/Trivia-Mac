import React, { Component } from 'react';
//import { Header } from '../../components';
import "./profile.css";

export default class Profile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: props.user
		}
	}

	componentDidMount() {
		console.log("Profile Component Mounted")
	}

	render() {
		return <p>Hello Profile</p>
	}

}
