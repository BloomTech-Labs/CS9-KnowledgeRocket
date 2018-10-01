import React, { Component } from 'react';
import { connect } from 'react-redux';
// Actions
import { generateBreadCrumbs, updateUser } from '../../actions';
// Styles
import './Settings.css';
// Material Components
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Button, TextField, FormLabel, FormControl } from '@material-ui/core';

function mapStateToProps(state) {
    return {
        state,
    };
}

const styles = theme => ({
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
});

class Settings extends Component {
    state = {
        currentPW: '',
        newPW: '',
        ccEmail: '',
        authProvider: '',
        open: false,
    };
    componentDidMount() {
        // Checks for User to be Authenticated
        // If not authenticated it will send the user to <login/>
        // If authenticated it will set the state with the current user.
        if (!this.props.state.user.authenticated) {
            this.props.history.push('/rocket/auth');
        }
        this.props.generateBreadCrumbs(this.props.history.location.pathname);
        this.setState({ authProvider: this.props.state.user.authProvider });
    }

    handleUpdateSettings = e => {
        e.preventDefault();
        const packagedUser = JSON.parse(JSON.stringify(this.props.state.user));
        packagedUser.changes = this.state;
        this.props.updateUser(packagedUser);
        this.handleActionClick();
    };

    handleInput = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    handleActionClick = () => {
        this.setState({ open: true });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        const { message } = this.props.state.user;

        if (this.state.authProvider === 'email') {
            return (
                <div className="Main_container">
                    <form>
                        <FormControl className="Settings_form">
                            <header className="title10">User Account Settings</header>
                            <FormLabel className={'Settings_info'}>
                                {'Update your account information below.'}
                            </FormLabel>
                            <TextField
                                id="currentPW"
                                label="Current Password"
                                className="Settings_input"
                                type="password"
                                margin="normal"
                                onChange={this.handleInput}
                            />
                            <TextField
                                id="newPW"
                                label="New Password"
                                className="Settings_input"
                                type="password"
                                margin="normal"
                                onChange={this.handleInput}
                            />
                            <TextField
                                id="ccEmail"
                                label="Change Rocket Email?"
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
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.open}
                        autoHideDuration={5000}
                        onClose={this.handleRequestClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{message}</span>}
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                className={classes.close}
                                onClick={this.handleRequestClose}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
                    ;
                </div>
            );
        } else {
            return (
                <div className="Main_container">
                    <form>
                        <FormControl className="Settings_form">
                            <header className="title10">User Account Settings</header>
                            <FormLabel className={'Settings_info--Oauth'}>
                                {`You must update your account information with: ${
                                    this.state.authProvider
                                }`}
                            </FormLabel>
                            <TextField
                                id="ccEmail"
                                label="Change Rocket Email?"
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
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.open}
                        autoHideDuration={5000}
                        onClose={this.handleRequestClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{message}</span>}
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                className={classes.close}
                                onClick={this.handleRequestClose}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
                </div>
            );
        }
    }
}

export default connect(
    mapStateToProps,
    { generateBreadCrumbs, updateUser }
)(withStyles(styles)(Settings));
