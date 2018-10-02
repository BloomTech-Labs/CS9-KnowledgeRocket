import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import {
    addUser,
    loginUser,
    loginUserGoogle,
    loginUserFacebook,
    loginUserTwitter,
    generateBreadCrumbs,
} from '../../actions';
// MaterialComponents
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import Progress from '../Progress/Progress';
import AuthBackside from './AuthBackside';

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

const styles = {
    root: {
        padding: 0,
        overflow: 'visible !important',
    },
    media: {
        height: 140,
    },
};

export const StyledFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: inherit;
    min-height: 40rem;
    width: 100%;
    margin: 0;
    box-sizing: border-box;
    border-radius: 0.25rem;
`;

const StyledFormCard = styled(Card)`
    display: flex;
    flex-direction: row;
    min-width: 10rem;
    max-width: 40rem;
    width: 100%;
    overflow: visible;
    transform-origin: 25% 50%;
    transform-style: preserve-3d;
    transition: all 1s ease-in-out;
    border-radius: 0.25rem;
    box-shadow: 0px 1px 13px 0px rgba(15, 12, 12, 0.3), 0px 1px 13px 0px rgba(15, 12, 12, 0.3),
        0px 2px 13px -1px rgba(15, 12, 12, 0.3) !important;
`;

export const StyledCardContent = styled(CardContent)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #3f51b5;
    width: 100%;
    font-size: 1.5rem;
    border-radius: 0.25rem;
`;

export const StyledFormHeader = styled(StyledCardContent)`
    display: flex;
    flex-direction: row;
    background-color: #fff;
    font-weight: 900;
    line-height: 40px;
    color: #324151;
    min-width: 10rem;
    width: 100%;
    padding: 0;
    flex-direction: row;
    border-radius: 0.25rem;
`;

export const StyledInputContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
`;

export const FieldSet = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 50%;
    @media (max-width: 700px) {
        width: 20rem;
    }
`;

export const FieldSetSocial = styled(FieldSet)``;

export const StyledInput = styled.input`
    background-color: white;
    width: 16rem;
    height: 3rem;
    font-weight: 600;
    font-size: 1rem;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.6);
    margin: 1rem;
    padding: 1rem;
    border-radius: 0.25rem;
    &:focus {
        outline: none;
    }
    //Only use 1 colon
    &:placeholder {
        color: #fff;
        font-weight: 300;
        opacity: 0.7;
    }
    &:focus,
    &:valid {
        border-color: white;
    }
`;

export const StyledButton = styled.button`
    margin: 1rem;
    font-weight: 600;
    font-size: 1rem;
    color: #fff;
    background-color: inherit;
    width: 16rem;
    height: 3rem;
    border: 1px solid #fff;
    border-radius: 2rem;
    &:focus {
        outline: none;
    }
    &:hover {
        background-color: HSLA(0, 0%, 100%, 0.2);
    }
`;

export const StyledGoogleBtn = styled(StyledButton)``;

class Auth extends Component {
    state = {
        email: '',
        password: '',
        authenticated: {},
        success: true,
        flipStatus: false,
        attempts: 0,
    };

    componentDidMount() {
        this.props.user.authenticated === false
            ? this.setState({ success: false })
            : this.setState({ success: true });
    }

    handleFlip = () => {
        this.setState({ flipStatus: true });
    };

    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSignUp = e => {
        const user = {
            email: this.state.email,
            password: this.state.password,
            authType: 'signup',
        };
        this.props.addUser(user);
        this.setState({ attempts: this.state.attempts + 1 });
        this.handleFlip();
    };

    handleSignIn = e => {
        const user = {
            email: this.state.email,
            password: this.state.password,
            authType: 'signin',
        };
        this.props.loginUser(user);
        this.setState({ attempts: this.state.attempts + 1 });
        this.handleFlip();
    };

    handleSignInGoogle = e => {
        this.props.loginUserGoogle();
        this.handleFlip();
    };

    handleSignInFacebook = e => {
        this.props.loginUserFacebook();
        this.handleFlip();
    };

    handleSignInTwitter = e => {
        this.props.loginUserTwitter();
        this.handleFlip();
    };

    returnToAuth = e => {
        // If log-in fails, return user to auth page
        // When they click the back card again.
        // Stop Propagation to Ignore fields hidden beneath.
        e.stopPropagation();
        if (!this.state.success) {
            this.setState({ flipStatus: false });
        }
    };

    render() {
        const { classes } = this.props;
        const flip = { transform: 'translate(0, 0) rotateX(180deg)' };

        return (
            <StyledFormContainer>
                <StyledFormCard
                    className={classes.root}
                    style={this.state.flipStatus ? flip : null}
                >
                    <StyledCardContent
                        className={classes.root}
                        style={
                            this.state.flipStatus
                                ? {
                                      userSelect: 'none',
                                      visibility: 'hidden',
                                      opacity: '0',
                                      transition: 'visibility 0s linear 1000ms, opacity 1000ms',
                                      backgroundColor: '#3f51b5',
                                  }
                                : {
                                      userSelect: 'none',
                                      visibility: 'visible',
                                      opacity: '1',
                                      transition: 'visibility 0s linear 0ms, opacity 1000ms',
                                      backgroundColor: '#3f51b5',
                                  }
                        }
                    >
                        <StyledFormHeader>
                            {this.props.user.status === 'USER_PASSWORD_RESET'
                                ? 'Check your E-Mail for your Password Reset Link'
                                : 'Sign In or Sign Up'}
                        </StyledFormHeader>
                        <StyledInputContainer>
                            <FieldSet>
                                <StyledInput
                                    type="text"
                                    name="email"
                                    onChange={this.handleInput}
                                    placeholder="email"
                                    required
                                />
                                <StyledInput
                                    type="password"
                                    name="password"
                                    onChange={this.handleInput}
                                    placeholder="password"
                                    required
                                />
                                <StyledButton
                                    style={{ marginTop: '20px' }}
                                    onClick={this.handleSignIn}
                                >
                                    Sign In
                                </StyledButton>
                                <StyledButton onClick={this.handleSignUp}>Sign Up</StyledButton>
                            </FieldSet>
                            <FieldSetSocial>
                                <StyledGoogleBtn onClick={this.handleSignInGoogle}>
                                    <span style={{ padding: '0 0.5rem' }}>
                                        <i className="fab fa-google fa-lg" />
                                    </span>{' '}
                                    Sign In with Google
                                </StyledGoogleBtn>
                                <StyledButton onClick={this.handleSignInFacebook}>
                                    <span style={{ padding: '0 0.5rem' }}>
                                        <i className="fab fa-facebook-f fa-lg" />
                                    </span>{' '}
                                    Sign In with Facebook
                                </StyledButton>
                                <StyledButton onClick={this.handleSignInTwitter}>
                                    <span style={{ padding: '0 0.5rem' }}>
                                        <i className="fab fa-twitter fa-lg" />
                                    </span>{' '}
                                    Sign in with Twitter
                                </StyledButton>
                            </FieldSetSocial>
                        </StyledInputContainer>
                    </StyledCardContent>
                    <AuthBackside
                        message={'failed'}
                        tryAgain={this.returnToAuth}
                        key={'AuthBackCard'}
                        style={
                            this.state.flipStatus
                                ? {
                                      userSelect: 'all',
                                      opacity: '0',
                                      visibility: 'hidden',
                                      transition: 'visibility 0s linear 1000ms, opacity 1000ms',
                                      backgroundColor: '#3f51b5',
                                  }
                                : {
                                      userSelect: 'none',
                                      visibility: 'visible',
                                      opacity: '1',
                                      transition: 'visibility 0s linear 1000ms, opacity 1000ms',
                                      backgroundColor: '#3f51b5',
                                  }
                        }
                        status={this.props.user.status}
                        attempts={this.state.attempts}
                    />
                </StyledFormCard>
                {this.props.user.authenticated ? <Redirect to="/rocket" /> : null}
            </StyledFormContainer>
        );
    }
}

export default connect(
    mapStateToProps,
    {
        addUser,
        loginUser,
        loginUserGoogle,
        loginUserFacebook,
        loginUserTwitter,
        generateBreadCrumbs,
    }
)(withStyles(styles)(Auth));
