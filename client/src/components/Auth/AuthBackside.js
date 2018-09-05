import React from 'react';
import styled from 'styled-components';
import AuthResetPassword from './AuthResetPassword';

const StyledSection = styled.section`
    justify-content: flex-start;
    background-color: #3f51b5;
    font-size: 1rem;
    letter-spacing: 0.1rem;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    backface-visibility: hidden;
    text-align: center;
    transform-style: preserve-3d;
    transform: rotateX(180deg);
    border-radius: 0.25rem;
    z-index: 1000;
    h2 {
        color: #39d1b4;
    }
    h3 {
        color: white;
    }
    border-radius: 0.25rem;
`;

const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
`;

const AuthBackside = props => {
    return (
        <StyledSection
            onClick={props.attempts > 2 ? null : props.tryAgain}
            onFocus={props.attempts > 2 ? null : props.tryAgain}
            onBlur={props.attempts > 2 ? null : props.tryAgain}
            onMouseDown={props.attempts > 2 ? null : props.tryAgain}
        >
            {props.status === 'FAILED' ||
            props.status === 'USER_PASSWORD_RESET_FAILED' ||
            props.status === 'USER_PASSWORD_RESET' ? (
                <MessageContainer>
                    <div
                        style={
                            props.attempts > 2
                                ? { display: 'none' }
                                : { display: 'block', cursor: 'pointer', padding: '15px' }
                        }
                    >
                        <h2>Oops.</h2>
                        <br />
                        <h3>
                            Your log in failed. Please check your username and password. Click here
                            to try again. Thank you.
                        </h3>
                    </div>
                    {props.attempts > 2 ? <AuthResetPassword tryAgain={props.tryAgain} /> : null}
                </MessageContainer>
            ) : props.status === 'LOGGING_IN_USER' ? (
                <MessageContainer>
                    <h2>Please wait.</h2>
                    <br />
                    <h3>We are logging you in.</h3>
                </MessageContainer>
            ) : props.message === 'ADDING_USER' ? (
                <MessageContainer>
                    <h2>Please wait.</h2>
                    <br />
                    <h3>We are creating your account.</h3>
                </MessageContainer>
            ) : null}
        </StyledSection>
    );
};

export default AuthBackside;
