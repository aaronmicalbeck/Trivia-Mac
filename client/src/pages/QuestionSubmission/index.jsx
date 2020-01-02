import React, { Component } from "react";
import "./questionSubmission.css";


export default class QuestionSubmission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
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
  handleSubmit(event) {
    event.preventDefault();
    // Create

    
  }

  componentDidMount() {
    console.log("Question Submission Component Mounted");
  }

  render() {
    return (
      <div id="questionSubmissionForm">
        <p>Hello Question Submission</p>
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
		<button id="questionSubmitButton" onclick={this.handleSubmit}>
          Submit your Question for Review!
        </button>
      </div>
    );
  }
}
