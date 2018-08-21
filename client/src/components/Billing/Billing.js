import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Billing.css';
import CheckoutForm from './checkout';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { Card } from '../../../node_modules/@material-ui/core';
import { generateBreadCrumbs } from '../../actions';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

function mapStateToProps(state) {
    return {
        state,
    };
}

const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
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
        this.handleTypeChange(event.target.value)
    };

    handleTypeChange = type => {
        this.setState({ type: type });
    };
    render() {
        console.log('Subscription type:', this.state.type)
        const { classes } = this.props;

        return (
            <div className="Main_container">
                <StripeProvider apiKey={`${process.env.REACT_APP_PUBLIC_KEY}`}>
                    <div className="example">
                        <Card className="Premium_Content">
                            <span className="title10">What does premium offer?</span>
                            <p className="pText">
                                It offers unlimited access to all your favorite features for a
                                period of 1 year! No more worrying whether or not to create a new
                                account for every 10 students. You can have as many students and
                                knowledge rockets as you could ever want.
                            </p>
                            <h3 className="premTeam">Join the Premium Team For Only $9.99</h3>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Subscription</FormLabel>
                                <RadioGroup
                                    aria-label="gender"
                                    name="gender2"
                                    className={classes.group}
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                >
                                    <FormControlLabel
                                        value="monthly"
                                        control={<Radio color="primary" />}
                                        label="Monthly"
                                        labelPlacement="start"
                                    />
                                    <FormControlLabel
                                        value="yearly"
                                        control={<Radio color="primary" />}
                                        label="Yearly"
                                        labelPlacement="start"
                                    />
                                </RadioGroup>
                                <div>{`Total Cost: $${this.state.type === 'monthly' ? 9.99 : 29.99}`}</div>
                            </FormControl>
                        </Card>
                        <Elements>
                            <CheckoutForm
                                className="Stripe_Modal"
                                id={this.props.state.user._id}
                                uid={this.props.state.user.uid}
                                type={this.state.type}
                            />
                        </Elements>
                    </div>
                </StripeProvider>
            </div>
        );
    }
}

Billing.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(
    mapStateToProps,
    { generateBreadCrumbs }
)(withStyles(styles)(Billing));
