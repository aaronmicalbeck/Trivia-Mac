import React, { Component } from 'react'
import axios from 'axios'
import { Route } from 'react-router-dom'
import LoginForm from './pages/LoginForm'
import SignupForm from './pages/SignupForm'
import Home from './pages/Home'
import { NavBar } from './components'
import { subscribeToTimer } from './api';


class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loggedIn: false,
			user: null,
			timestamp: "No timestamp yet"
		}
		this._logout = this._logout.bind(this);
		this._login = this._login.bind(this);
		subscribeToTimer((err, timestamp) => this.setState({
			timestamp
		}));
	};

	componentDidMount() {
		axios.get('/auth/user').then(response => {
			if (!!response.data.user) {
				this.setState({
					loggedIn: true,
					user: response.data.user
				})
			} else {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	};

	_logout(event) {
		event.preventDefault()
		axios.post('/auth/logout').then(response => {
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_login(username, password) {
		axios
			.post('/auth/login', {
				username,
				password
			})
			.then(response => {
				if (response.status === 200) {
					this.setState({
						loggedIn: true,
						user: response.data.user
					})
				}
			})
	}

	render() {
		return (
			<div className="">

				<div className="App">
					<p className="App-intro">
						This is the timer value: {this.state.timestamp}
					</p>
				</div>
				{/* Navbar on every page */}
				<NavBar
					_logout={this._logout}
					loggedIn={this.state.loggedIn}
				/>
				{/*  Individual Things */}
				<Route
					exact
					path="/"
					render={() =>
						<Home user={this.state.user} />} />
				<Route
					exact
					path="/login"
					render={() =>
						<LoginForm
							_login={this._login}
							_googleSignin={this._googleSignin}
						/>}
				/>
				<Route
					exact path="/signup"
					component={SignupForm}
				/>
			</div>
		)
	}
}

export default App
