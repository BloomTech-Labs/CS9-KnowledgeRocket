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
import { Button, Input } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Progress from '../Progress/Progress';
import './Auth.css';

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

const styles = {
    card: {
        maxWidth: 345,
    },
    root: {
        padding: 0,
    },
    media: {
        height: 140,
    },
};

const StyledFormContainer = styled.div`
    margin-top: 110px;
    margin-right: 11.1rem;
`;

const StyledFormCard = styled(Card)`
    display: flex;
    flex-direction: row;
    height: 400px;
    width: 800px;

    transform: translate(0%, 0%);
    transform-origin: 25% 50%;
    transform-style: preserve-3d;
    transition: all 1s ease-in-out;
`;

const StyledCardContent = styled(CardContent)`
    background-color: #39d1b4;
    width: 100%;
    text-align: center;
    font-size: 1.5rem;
`;

const StyledFormHeader = styled(StyledCardContent)`
    display: block;
    background-color: #fff;
    font-weight: 300;
    line-height: 40px;
    color: #39d1b4;
    width: 100%;
    padding: 0;
`;

const StyledInputContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 100%;
    padding: 10px;
`;

const StyledInput = styled.input`
    background-color: inherit;
    width: 250px;
    height: 30px;
    color: #5b7383;
    font-weight: 600;
    font-size: 1rem;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.6);
    margin: 10px;

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: #fff;
        font-weight: 300;
        opacity: 0.7;
    }

    &:focus,
    &:valid {
        border-color: white;
    }
`;

const StyledButton = styled.button`
    font-weight: 600;
    font-size: 1rem;
    color: #fff;
    background-color: inherit;
    width: 250px;
    height: 50px;
    border: 1px solid #fff;
    border-radius: 25px;
    margin: 10px 0;

    &:focus {
        outline: none;
    }

    &:hover {
        background-color: HSLA(0, 0%, 100%, 0.2);
    }
`;

class Auth extends Component {
    state = {
        email: '',
        password: '',
        authenticated: {},
        success: true,
        flipStatus: false,
    };

    componentDidMount() {
        this.props.user.success === false
            ? this.setState({ success: false })
            : this.setState({ success: true });
        this.props.generateBreadCrumbs(this.props.history.location.pathname);
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
    };

    handleSignIn = e => {
        const user = {
            email: this.state.email,
            password: this.state.password,
            authType: 'signin',
        };
        this.props.loginUser(user);
        this.setState({ attempts: this.state.attempts + 1 });
    };

    handleSignInGoogle = e => {
        this.props.loginUserGoogle();
    };

    handleSignInFacebook = e => {
        this.props.loginUserFacebook();
    };

    handleSignInTwitter = e => {
        this.props.loginUserTwitter();
    };

    handleSignInGoogle = e => {
        this.props.loginUserGoogle();
    };

    handleSignInFacebook = e => {
        this.props.loginUserFacebook();
    };

    handleSignInTwitter = e => {
        this.props.loginUserTwitter();
    };

    render() {
        const { classes } = this.props;
        const flip = { transform: 'translate(0, 0%) rotateX(180deg)' };

        return (
            <StyledFormContainer>
                {/* <h1 className="Auth_header">Please Sign-in or Sign-up.</h1>
                <div className="flex-column-centered">
                    <Input
                        className="Auth_input"
                        type="email"
                        name="email"
                        autoFocus={true}
                        onChange={this.handleInput}
                        disableUnderline={true}
                    />
                    <Input
                        className="Auth_input"
                        type="password"
                        name="password"
                        onChange={this.handleInput}
                        disableUnderline={true}
                    />
                </div>
                <div className="flex-column-centered">
                    <div className="flex-row-centered">
                        <Button
                            className="Auth_button"
                            variant="contained"
                            color="primary"
                            onClick={this.handleSignUp}
                        >
                            Sign-Up
                        </Button>
                        <Button
                            className="Auth_button"
                            variant="contained"
                            color="primary"
                            onClick={this.handleSignIn}
                        >
                            Sign-In
                        </Button>
                    </div>
                    <div className="Auth_oauth_section">
                        <Button
                            className="Auth_button"
                            variant="contained"
                            color="primary"
                            onClick={this.handleSignInGoogle}
                        >
                            Google Log In
                        </Button>
                        <Button
                            className="Auth_button"
                            variant="contained"
                            color="primary"
                            onClick={this.handleSignInFacebook}
                        >
                            Facebook Log In
                        </Button>
                        <Button
                            className="Auth_button"
                            variant="contained"
                            color="primary"
                            onClick={this.handleSignInTwitter}
                        >
                            Twitter Log In
                        </Button>
                    </div>
                </div> */}
                <StyledFormCard style={this.state.flipStatus ? flip : null}>
                    <StyledCardContent className={classes.root}>
                        <StyledFormHeader>Sign In or Sign Up</StyledFormHeader>
                        <StyledInputContainer>
                            <div style={{ width: '50%' }}>
                                <StyledInput type="text" placeholder="username" required />
                                <StyledInput type="text" placeholder="password" required />
                                <StyledInput type="text" placeholder="email" required />
                                <StyledButton style={{ marginTop: '20px' }}>Sign In</StyledButton>
                                <StyledButton>Sign Up</StyledButton>
                            </div>
                            <div style={{ width: '50%' }}>
                                <StyledButton style={{ marginTop: '60px' }}>
                                    Sign In with Google
                                </StyledButton>
                                <StyledButton>Sign In with Facebook</StyledButton>
                                <StyledButton onClick={this.handleFlip}>
                                    Sign in with Twitter
                                </StyledButton>
                            </div>
                        </StyledInputContainer>
                    </StyledCardContent>
                </StyledFormCard>
                <div className="flex-row-centered Auth_prompt-fail">
                    {/* THIS SECTION WILL HANDLE USER AUTH ERROR MESSAGES */}
                    {this.props.user.status === 'FAILED' ? (
                        <p>
                            Authentication failed. Check your email and password and try again.
                            Thank you.
                        </p>
                    ) : this.props.user.status === 'ADDING_USER' ||
                    this.props.user.status === 'LOGGING_IN_USER' ? (
                        <Progress />
                    ) : null}
                </div>
                {this.props.user.authenticated ? <Redirect to="/rocket" /> : null}
            </StyledFormContainer>
        );
    }
}

export default connect(mapStateToProps, {
    addUser,
    loginUser,
    loginUserGoogle,
    loginUserFacebook,
    loginUserTwitter,
    generateBreadCrumbs,
})(withStyles(styles)(Auth));
