import React, { Component } from 'react';
import axios from 'axios';

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
};

class RocketQuestion extends Component {
    state = defaultState;

    componentDidMount() {
        const questionID = this.props.match.params.question;
        // Get stuff about the question from the server
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

    handleSubmit = e => {};

    handleInput = (e)=> {
        this.setState({[e.target.id]: e.target.value})
    }

    render() {
        console.log('My state is:', this.state);
        return (
            <div className="Question_container">
                <div>
                    <h1>{this.state.rocketQuestion.title}</h1>
                    <p>{this.state.rocketQuestion.explanation}</p>
                </div>
                <div>
                    <h2>{'Question:'}</h2>
                    <p>{this.state.rocketQuestion.question}</p>
                </div>
                <div>
                    {this.state.rocketQuestion.choices.map((answer, index) => {
                        return <div key={`${index}`}>[ ] {answer.text}</div>;
                    })}
                </div>
            </div>
        );
    }
}

export default RocketQuestion;
