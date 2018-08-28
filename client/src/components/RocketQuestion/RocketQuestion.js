import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import { CPCButton } from '../ControlPanel/ControlPanel';
import './RocketQuestion.css';

const url = process.env.REACT_APP_SERVER;

const defaultState = {
    answer: 0,
    questionID: '',
    studentID: '',
    rocketQuestion: {
        title: '',
        explanation: '',
        question: '',
        choices: [
            { text: '', correct: true },
            { text: '', correct: false },
            { text: '', correct: false },
            { text: '', correct: false },
        ],
        correct: '',
    },
    submitted: false,
};

const QuestionHeader = styled.div`
    margin-left: 2rem;
    margin-top: 2rem;
`;
const QuestionText = styled.p`
    font-size: 1.3rem;
    margin-bottom: 1.5rem;
`;

const StyledHeaders = styled.h1`
    align-self: flex-start;
    font-size 2rem;
    margin-bottom: 1rem;
    font-weight: 460;
    font-family: 'Roboto', serif;
`;
class RocketQuestion extends Component {
    state = { ...defaultState };

    componentDidMount() {
        const questionID = this.props.match.params.question;
        // Get stuff about the question from the server
        console.log(this.props);
        axios
            .get(`${url}/api/question/${questionID}`)
            .then(response => {
                this.setState({
                    questionID,
                    studentID: this.props.match.params.student,
                    rocketQuestion: response.data,
                });
            })
            .catch(questionError => {
                this.setState(defaultState);
            });
    }

    handleSubmit = e => {
        const packAge = {
            answer: this.state.answer,
            questionId: this.state.questionID,
            studentId: this.state.studentID,
        };
        axios
            .post(`${url}/api/responserocket/answer`, packAge)
            .then(response => {
                this.setState({
                    submitted: true,
                });
            })
            .catch(err => {
                this.setState({
                    submitted: err.message,
                });
            });
    };

    handleRadio = e => {
        this.setState({
            value: e.target.value,
        });
    };
    handleInput = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    render() {
        console.log(this.state.rocketQuestion.choices[0].correct);
        console.log('My state is:', this.state);
        return (
            <QuestionHeader className="Question_container">
                <div className="Question_text">
                    <StyledHeaders>{this.state.rocketQuestion.title}</StyledHeaders>
                    <QuestionText>{this.state.rocketQuestion.explanation}</QuestionText>
                </div>
                <div className="Question_question">
                    <StyledHeaders>{'Question:'}</StyledHeaders>
                    <QuestionText>{this.state.rocketQuestion.question}</QuestionText>
                </div>
                <div className="Question_answers">
                    <FormLabel component="legend" className="legend">
                        Please Answer The Question:
                    </FormLabel>
                    <FormControl component="fieldset" className={`fieldset`}>
                        {this.state.rocketQuestion.choices.map((answer, index) => {
                            return (
                                <RadioGroup
                                    value={this.state.value}
                                    name={'value' + index}
                                    onChange={this.handleRadio}
                                    key={index}
                                    className={
                                        this.state.submitted
                                            ? this.state.rocketQuestion.choices[index].correct
                                                ? 'answer--correct'
                                                : 'answer'
                                            : ''
                                    }
                                >
                                    <FormControlLabel
                                        value={answer.text}
                                        control={<Radio color="primary" />}
                                        label={
                                            this.state.submitted
                                                ? this.state.rocketQuestion.choices[index].correct
                                                    ? answer.text + ' (correct)'
                                                    : answer.text
                                                : answer.text
                                        }
                                        labelPlacement="end"
                                    />
                                </RadioGroup>
                            );
                        })}
                        <CPCButton className="submitButton" onClick={this.handleSubmit}>
                            Submit Answer
                        </CPCButton>
                    </FormControl>
                </div>
            </QuestionHeader>
        );
    }
}

export default RocketQuestion;
