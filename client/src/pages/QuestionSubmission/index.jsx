import React, { Component } from 'react';
//import { Header } from '../../components';
import "./questionSubmission.css";

export default class QuestionSubmission extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: props.user
		}
	}

	componentDidMount() {
		console.log("Question Submission Component Mounted")
	}

	render() {
		return <p>Hello Question Submission</p>
	}

}
