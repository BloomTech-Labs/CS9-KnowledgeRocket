import React, { Component } from 'react';
import styled from 'styled-components';
import './RocketQuestion.css';

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

const StyledHeaders = styled.h1`
    align-self: flex-start;
    font-size 2rem;
    margin: 0 0 1.5rem 1rem;
    font-weight: 460;
    font-family: 'Roboto', serif;
`;

class RocketQuestion extends Component {

    render() {
        return (
            <QuestionHeader className="Question_container">
                <div className="Question_Wrapper">
                    <div className="Question_text">
                        <StyledHeaders>Thank You for your Submission.</StyledHeaders>
                    </div>
                </div>
            </QuestionHeader>
        );
    }
}

export default RocketQuestion;
