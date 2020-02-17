import React, { Component } from "react";
import "./questionSubmission.css";
import gsap from "gsap"
import questionAPI from "../../utils/questionAPI";
import {
  FormControl,
  Input,
  InputLabel,
  Grid,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";
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
    this.emptyForm = this.emptyForm.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  emptyForm = () => {
    this.setState({
      question: "",
      correctAnswer: "",
      incorrectAnswer1: "",
      incorrectAnswer2: "",
      incorrectAnswer3: ""
    });
  };

  // Retrieves information input into forms and POSTS to MongoDB

  handleSubmit(event) {
    event.preventDefault();
    questionAPI
      .submitQuestion({
        question: this.state.question,
        correctAnswer: this.state.correctAnswer,
        incorrectAnswer1: this.state.incorrectAnswer1,
        incorrectAnswer2: this.state.incorrectAnswer2,
        incorrectAnswer3: this.state.incorrectAnswer3
      })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    this.emptyForm();
    this.openModal();
  }

  // Axios GET request all from MongoDB

  handleGet(event) {
    event.preventDefault();
    questionAPI.getQuestions().then(res => console.log("Perfecto!"));
  }

  componentDidMount() {
     gsap.from("#questionSubmissionInstructions", { duration: 2, delay: .5, x: "-101%", opacity: 0 });
  }

  render() {
    return (
      <div>
      <h1 id="questionSubmissionInstructions">Submit a Question to the Trivia-Mac question library!</h1>
      <div id="questionSubmissionForm">
        

        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          width="100%"
        >
          <FormControl>
            <InputLabel id="questionInputLabel" htmlFor="my-input" width="100%">
              Question{" "}
            </InputLabel>
            <Input
              id="question"
              type="text"
              name="question"
              value={this.state.question}
              onChange={this.handleChange}
            />
          </FormControl>
          <br></br>
          <FormControl>
            <InputLabel htmlFor="my-input">Correct Answer </InputLabel>
            <Input
              id="correctAnswer"
              type="text"
              name="correctAnswer"
              value={this.state.correctAnswer}
              onChange={this.handleChange}
              color="primary"
            />
          </FormControl>
          <br></br>
          <FormControl>
            <InputLabel htmlFor="my-input">Second Choice</InputLabel>
            <Input
              id="incorrectAnswer1"
              type="text"
              name="incorrectAnswer1"
              value={this.state.incorrectAnswer1}
              onChange={this.handleChange}
              variant="outlined"
              color="secondary"
            />
          </FormControl>
          <br></br>
          <FormControl>
            <InputLabel htmlFor="my-input">Third Choice</InputLabel>
            <Input
              id="incorrectAnswer2"
              type="text"
              name="incorrectAnswer2"
              value={this.state.incorrectAnswer2}
              onChange={this.handleChange}
              variant="outlined"
              color="secondary"
            />
          </FormControl>
          <br></br>
          <FormControl>
            <InputLabel htmlFor="my-input">Fourth Choice</InputLabel>
            <Input
              id="incorrectAnswer3"
              type="text"
              name="incorrectAnswer3"
              value={this.state.incorrectAnswer3}
              onChange={this.handleChange}
              variant="outlined"
              color="secondary"
            />
          </FormControl>
          <br></br>
          <Button id="questionSubmitButton" onClick={this.handleSubmit}>
            Submit your Question for Review!
          </Button>
          <Link to="/" className="nav-link">
          <NavigationButton>
            <span id="homeNavBtnTitle">Back</span>
          </NavigationButton>
        </Link>
        </Grid>
      </div>
      </div>
    );
  }
}
