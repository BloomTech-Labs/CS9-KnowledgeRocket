import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import './RocketQuestion.css';

const url = process.env.REACT_APP_SERVER;

const defaultState = {
    value: 0,
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
        correct: 0,
    },
    submitted: false,
};

const QuestionHeader = styled.div`
    font-family: 'Roboto', serif;
    padding: 1rem;
    max-width: 600px;
    margin: 0 auto;
    .Question_Wrapper {
        background-color: white;
        border-radius: .5rem;
        padding: 2rem
        box-shadow: 0px 3px 8px rgba(0,0,0,0.2);
        border: 1px solid #A9A9A9;
    }
    .legend {
        padding: 0 1.5rem;
        font-size: 0.9rem;
    }
`;
const QuestionText = styled.p`
    font-size: 1rem;
    margin: 0 0 1.5rem 2rem;
`;

const StyledHeaders = styled.h1`
    align-self: flex-start;
    font-size 2rem;
    margin: 0 0 1.5rem 1rem;
    font-weight: 460;
    font-family: 'Roboto', serif;
`;

class RocketQuestion extends Component {
    state = JSON.parse(JSON.stringify(defaultState));

    componentDidMount() {
        const questionID = this.props.match.params.question;
        axios
            .get(`${url}/api/question/${questionID}`)
            .then(response => {
                if (response.data.choices.length > 0) {
                    this.setState({
                        questionID,
                        studentID: this.props.match.params.student,
                        rocketQuestion: response.data,
                    });
                }
            })
            .catch(questionError => {
                this.setState(defaultState);
            });
    }

    handleSubmit = e => {
        if (!this.state.submitted) {
            const packAge = {
                answer: this.state.value,
                questionId: this.state.questionID,
                studentId: this.state.studentID,
            };
            if (this.props.match.params.cohort) {
                packAge.cohortId = this.props.match.params.cohort;
            }
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
        } else {
            this.props.history.push('/question/thankyou');
        }
    };

    handleRadio = e => {
        this.setState({
            value: Number(e.target.name),
            select: e.target.value
        });
    };

    render() {
        return (
            <QuestionHeader className="Question_container">
                <div className="Question_Wrapper">
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
                            Select one answer and hit submit:
                        </FormLabel>
                        <FormControl component="fieldset" className={`fieldset`}>
                            {this.state.rocketQuestion.choices.map((answer, index) => {
                                return (
                                    <RadioGroup
                                        value={this.state.select}
                                        name={`${index}`}
                                        onChange={this.handleRadio}
                                        key={index}
                                        className={
                                            this.state.submitted
                                                ? this.state.rocketQuestion.choices[index].correct
                                                    ? 'answer--correct'
                                                    : 'answer'
                                                : 'choices'
                                        }
                                    >
                                        <FormControlLabel
                                            value={answer.text}
                                            control={<Radio color="primary" />}
                                            label={
                                                this.state.submitted
                                                    ? this.state.rocketQuestion.choices[index]
                                                          .correct
                                                        ? answer.text + ' (correct)'
                                                        : answer.text
                                                    : answer.text
                                            }
                                            labelPlacement="end"
                                        />
                                    </RadioGroup>
                                );
                            })}
                            <Button
                                className="submitButton"
                                color="primary"
                                onClick={this.handleSubmit}
                                variant="contained"
                            >
                                Submit Answer
                            </Button>
                        </FormControl>
                    </div>
                </div>
            </QuestionHeader>
        );
    }
}

export default RocketQuestion;
