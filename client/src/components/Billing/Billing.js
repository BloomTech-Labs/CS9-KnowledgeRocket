import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Billing.css';
import CheckoutForm from './checkout';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { Card } from '../../../node_modules/@material-ui/core';
import { generateBreadCrumbs } from '../../actions';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
// import Styled from 'styled-components';

function mapStateToProps(state) {
    return {
        state,
    };
}
const styles = theme => ({
    root: {
        display: 'flex',
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
    render() {
        console.log('Subscription type:', this.state.type);
        const { classes } = this.props;

        return (
            <StripeProvider apiKey={`${process.env.REACT_APP_PUBLIC_KEY}`}>
                <div className="Main_container">
                    <FormControl component="fieldset" className={`fieldset`} >
                        <header className='title10'>Billing and Subscriptions</header>
                        <Card className="radioGroup">
                            <FormLabel component="legend" className='legend'>Please Pick a Subscription</FormLabel>
                            <RadioGroup
                                aria-label="gender"
                                name="gender2"
                                value={this.state.value}
                                onChange={this.handleChange}
                            >
                                <FormControlLabel
                                    value="monthly"
                                    control={<Radio color="primary" />}
                                    label="1 Month Subscription"
                                    labelPlacement="end"
                                />
                                <FormControlLabel
                                    value="yearly"
                                    control={<Radio color="primary" />}
                                    label="1 Year Subscription"
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
                        />
                    </Elements>
                </div>
            </StripeProvider>
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
