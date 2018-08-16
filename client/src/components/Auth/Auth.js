import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addUser, loginUser } from '../../actions';
import { Button, Input } from '@material-ui/core';
import './Auth.css';

// Initialize Firebase

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
    };

    componentDidMount() {}

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
    };

    handleSignIn = e => {
        const user = {
            email: this.state.email,
            password: this.state.password,
            authType: 'signin',
        };
        this.props.loginUser(user);
    };

    render() {
        console.log('props user', this.props.user);
        console.log('state user', this.state.authenticated);
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
                </div>
                {this.props.user.authenticated ? <Redirect to="/rocket" /> : null }
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    { addUser, loginUser }
)(Auth);
