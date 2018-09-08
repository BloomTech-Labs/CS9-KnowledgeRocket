import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Billing.css';
import CheckoutForm from './checkout';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { generateBreadCrumbs, refreshUser } from '../../actions';
// Material Components
import { withStyles } from '@material-ui/core/styles';
import { Card } from '../../../node_modules/@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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

class Billing extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false, type: 'monthly', value: 'monthly' };
    }

    componentDidMount() {
        // Checks for User to be Authenticated
        // If not authenticated it will send the user to <login/>
        // If authenticated it will set the state with the current user.
        if (!this.props.state.user.authenticated) {
            this.props.history.push('/rocket/auth');
        }
        this.props.generateBreadCrumbs(this.props.history.location.pathname);
    }

    handleChange = event => {
        this.setState({ value: event.target.value });
        this.handleTypeChange(event.target.value);
    };

    handleTypeChange = type => {
        this.setState({ type: type });
    };

    handleActionClick = () => {
        console.log('MADE IT TO handleActionClick');
        this.setState({ open: true });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    render() {
        console.log(`OPEN ${this.state.open}`);
        const { classes } = this.props;
        const { message } = this.props.state.user;

        return (
            <StripeProvider apiKey={`${process.env.REACT_APP_PUBLIC_KEY}`}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <FormControl component="fieldset" className={`fieldset`}>
                        <header className="title10">Billing and Subscriptions</header>
                        <Card className="radioGroup">
                            <FormLabel component="legend" className="legend">
                                Add Premium Time
                            </FormLabel>
                            <RadioGroup
                                aria-label="gender"
                                name="gender2"
                                value={this.state.value}
                                onChange={this.handleChange}
                            >
                                <FormControlLabel
                                    value="monthly"
                                    control={<Radio color="primary" />}
                                    label="1 Month"
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    value="yearly"
                                    control={<Radio color="primary" />}
                                    label="1 Year"
                                    labelPlacement="end"
                                />
                            </RadioGroup>
                            <div>{`Total Cost: $${
                                this.state.type === 'monthly' ? 9.99 : 29.99
                            }`}</div>
                        </Card>
                    </FormControl>
                    <Elements>
                        <CheckoutForm
                            id={this.props.state.user._id}
                            uid={this.props.state.user.uid}
                            type={this.state.type}
                            refreshUser={this.props.refreshUser}
                            actionClick={this.handleActionClick}
                        />
                    </Elements>
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
            </StripeProvider>
        );
    }
}

export default connect(mapStateToProps, { generateBreadCrumbs, refreshUser })(
    withStyles(styles)(Billing)
);
