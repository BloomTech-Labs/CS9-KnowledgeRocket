import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Billing.css';
import CheckoutForm from './checkout';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { Card } from '../../../node_modules/@material-ui/core';
import { generateBreadCrumbs } from '../../actions';
function mapStateToProps(state) {
    return {
        state,
    };
}

class Billing extends Component {
    componentDidMount() {
        // Checks for User to be Authenticated
        // If not authenticated it will send the user to <login/>
        // If authenticated it will set the state with the current user.
        if (!this.props.state.user.authenticated) {
            this.props.history.push('/rocket/auth');
        }
        this.props.generateBreadCrumbs(this.props.history.location.pathname);
    }
    render() {
        return (
            <StripeProvider apiKey={`${process.env.REACT_APP_PUBLIC_KEY}`}>
                <div className="example">
                    <Card className="Premium_Content">
                        <span className="title10">What does premium offer?</span>
                        <p className="pText">
                            It offers unlimited access to all your favorite features for a period of
                            1 year! No more worrying whether or not to create a new account for
                            every 10 students. You can have as many students and knowledge rockets
                            as you could ever want.
                        </p>
                        <h1>Join the Premium Team For Only $9.99</h1>
                    </Card>
                    <Card>
                        <Elements>
                            <CheckoutForm uid={this.props.state.user.uid} />
                        </Elements>
                    </Card>
                </div>
            </StripeProvider>
        );
    }
}

export default connect(
    mapStateToProps,
    { generateBreadCrumbs }
)(Billing);
