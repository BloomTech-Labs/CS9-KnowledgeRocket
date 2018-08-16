import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
    addUser,
    loginUser,
    loginUserGoogle,
    loginUserFacebook,
    loginUserTwitter,
} from '../../actions';
import { Button, Input } from '@material-ui/core';
import Progress from '../Progress/Progress';
import './Auth.css';

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

class Auth extends Component {
    state = {
        email: '',
        password: '',
        authenticated: {},
        success: true,
    };

    componentDidMount() {
        this.props.user.success === false
            ? this.setState({ success: false })
            : this.setState({ success: true });
    }

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

    render() {
        // console.log('props user', this.props.user);
        // console.log('state user', this.state.authenticated);
        return (
            <div className="Main_container">
                <h1 className="Auth_header">Please Sign-in or Sign-up.</h1>
                <div className="flex-column-centered">
                    <Input
                        className="Auth_input"
                        type="email"
                        name="email"
                        autoFocus={true}
                        onChange={this.handleInput}
                    />
                    <Input
                        className="Auth_input"
                        type="password"
                        name="password"
                        onChange={this.handleInput}
                    />
                </div>
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
                    <Button
                        className="Auth_button"
                        variant="contained"
                        color="primary"
                        onClick={this.handleSignInGoogle}
                    >
                        Log In with Google
                    </Button>
                    <Button
                        className="Auth_button"
                        variant="contained"
                        color="primary"
                        onClick={this.handleSignInFacebook}
                    >
                        Log In with Facebook
                    </Button>
                    <Button
                        className="Auth_button"
                        variant="contained"
                        color="primary"
                        onClick={this.handleSignInTwitter}
                    >
                        Log In with Twitter
                    </Button>
                </div>
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
            </div>
        );
    }
}

export default connect(mapStateToProps, {
    addUser,
    loginUser,
    loginUserGoogle,
    loginUserFacebook,
    loginUserTwitter,
})(Auth);
