import React, { Component } from "react";
import "./questionSubmission.css";
import questionAPI from "../../utils/questionAPI";
import {Link} from "react-router-dom";
import NavigationButton from "../../components/NavigationButton";


export default class QuestionSubmission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      correctAnswer: "",
      incorrectAnswer1: "",
      incorrectAnswer2: "",
      incorrectAnswer3: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Retrieves information input into forms and POSTS to MongoDB

  handleSubmit(event) {
    event.preventDefault();
    questionAPI.submitQuestion({
		question: this.state.question,
		correctAnswer: this.state.correctAnswer,
		incorrectAnswer1: this.state.incorrectAnswer1,
		incorrectAnswer2: this.state.incorrectAnswer2,
		incorrectAnswer3: this.state.incorrectAnswer3

	})
  .then(res => console.log(res.data))
  .then(console.log("Thank you for submitting!"))
	.catch(err => console.log(err)
	);

    
  }

  // Axios GET request all from MongoDB

  handleGet(event){
    event.preventDefault();
    questionAPI.getQuestions().then(res => console.log("Perfecto!"))
  }

  componentDidMount() {
  // We deed it
  }

  render() {
    return (
      <div id="questionSubmissionForm">
        <p>SUBMIT A QUESTION TO BE USED IN GAME!</p>
        <input
          id="question"
          placeholder="Type your question here!"
          type="text"
          name="question"
          value={this.state.question}
          onChange={this.handleChange}
        ></input>
        <br></br>
        <input
          id="correctAnswer"
          placeholder="Type the correct answer here!"
          type="text"
          name="correctAnswer"
          value={this.state.correctAnswer}
          onChange={this.handleChange}
        ></input>
        <br></br>
        <input
          id="incorrectAnswer1"
          placeholder="Type an incorrect answer choice here!"
          type="text"
          name="incorrectAnswer1"
          value={this.state.incorrectAnswer1}
          onChange={this.handleChange}
        ></input>
        <br></br>
        <input
          id="incorrectAnswer2"
          placeholder="Type an incorrect answer choice here!"
          type="text"
          name="incorrectAnswer2"
          value={this.state.incorrectAnswer2}
          onChange={this.handleChange}
        ></input>
        <br></br>
        <input
          id="incorrectAnswer3"
          placeholder="Type an incorrect answer choice here!"
          type="text"
          name="incorrectAnswer3"
          value={this.state.incorrectAnswer3}
          onChange={this.handleChange}
        ></input>
        <br></br>
		<button id="questionSubmitButton" onClick={this.handleSubmit}>
          Submit your Question for Review!
        </button>
        <Link to="/" className="nav-link">
        <NavigationButton>Home</NavigationButton>
            </Link>
      </div>
    );
  }
}
