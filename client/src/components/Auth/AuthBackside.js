import React from 'react';
import styled from 'styled-components';
import AuthResetPassword from './AuthResetPassword';

const StyledSection = styled.section`
    background-color: #5b7383;
    font-size: 1rem;
    letter-spacing: 0.1rem;
    padding: 15px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
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

const AuthBackside = props => {
    return (
        <StyledSection
            onClick={props.attempts > 2 ? null : props.tryAgain}
            onFocus={props.attempts > 2 ? null : props.tryAgain}
            onBlur={props.attempts > 2 ? null : props.tryAgain}
            onMouseDown={props.attempts > 2 ? null : props.tryAgain}
        >
            {props.status === 'FAILED' || props.status === 'USER_PASSWORD_RESET_FAILED' || props.status === 'USER_PASSWORD_RESET' ? (
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                    <div style={props.attempts > 2 ? {display: 'none'}:{display: 'block'}}>
                    <h2>Oops.</h2>
                    <br />
                    <h3>
                        Your log in failed. Please check your username and password. Click here to
                        try again. Thank you.
                    </h3>
                    </div>
                    {props.attempts > 2 ? <AuthResetPassword tryAgain={props.tryAgain} /> : null }
                </div>
            ) : props.status === 'LOGGING_IN_USER' ? (
                <div><h2>Please wait.</h2>, <br />, <h3>We are logging you in.</h3></div>
            ) : props.message === 'ADDING_USER' ? (
                <div><h2>Please wait.</h2>, <br />, <h3>We are creating your account.</h3></div>
            ) : null}
        </StyledSection>
    );
};

export default AuthBackside;
