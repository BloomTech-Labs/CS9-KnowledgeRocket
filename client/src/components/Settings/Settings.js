import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generateBreadCrumbs } from '../../actions';
import './Settings.css';
import { Button, TextField, FormLabel, FormControl } from '@material-ui/core';
import { updateUser } from '../../actions';

function mapStateToProps(state) {
    return {
        state,
    };
}

class Settings extends Component {
    state = {
        currentPW: '',
        newPW: '',
        ccEmail: '',
    };
    componentDidMount() {
        // Checks for User to be Authenticated
        // If not authenticated it will send the user to <login/>
        // If authenticated it will set the state with the current user.
        if (!this.props.state.user.authenticated) {
            this.props.history.push('/rocket/auth');
        }
        this.props.generateBreadCrumbs(this.props.history.location.pathname);
    }

    handleUpdateSettings = e => {
        e.preventDefault();
        const packagedUser = JSON.parse(JSON.stringify(this.props.state.user));
        packagedUser.changes = this.state;
        this.props.updateUser(packagedUser);
    };

    handleInput = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    render() {
        console.log(this.state);
        return (
            <div className="Main_container">
                <form>
                    <FormControl className="Settings_form">
                        <header className="title10">User Account Settings</header>
                        <FormLabel
                            className={
                                this.props.state.user.authProvider === 'email'
                                    ? 'Settings_info'
                                    : 'Settings_info--Oauth'
                            }
                        >
                            {this.props.state.user.authProvider === 'email'
                                ? 'Update your account information below.'
                                : `You must update your account information with: ${
                                      this.props.state.user.authProvider
                                  }`}
                        </FormLabel>
                        <TextField
                            id="currentPW"
                            label="Current Password"
                            className="Settings_input"
                            type="password"
                            margin="normal"
                            onChange={this.handleInput}
                            value={this.state.currentPW}
                        />
                        <TextField
                            id="newPW"
                            label="New Password"
                            className="Settings_input"
                            type="password"
                            margin="normal"
                            onChange={this.handleInput}
                            value={this.state.newPW}
                        />
                        <TextField
                            id="ccEmail"
                            label="Change CC Email?"
                            className="Settings_input"
                            type="email"
                            margin="normal"
                            onChange={this.handleInput}
                        />
                        <Button
                            onClick={this.handleUpdateSettings}
                            type="button"
                            className="Settings_submit"
                            variant="contained"
                            color="primary"
                            value={this.state.ccEmail}
                        >
                            Submit
                        </Button>
                    </FormControl>
                </form>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    { generateBreadCrumbs, updateUser }
)(Settings);
