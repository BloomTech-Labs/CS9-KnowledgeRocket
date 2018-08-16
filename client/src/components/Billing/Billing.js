import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import './Billing.css';
import CheckoutForm from './checkout';
import { Elements, StripeProvider } from 'react-stripe-elements';
<script src="https://js.stripe.com/v3/" />;

function mapStateToProps(state) {
    return {
        state,
    };
}

class Billing extends Component {
    state = {
        open: false,
    };
    componentDidMount() {
        // Checks for User to be Authenticated
        // If not authenticated it will send the user to <login/>
        // If authenticated it will set the state with the current user.
        if (!this.props.state.user.authenticated) {
            this.props.history.push('/rocket/auth');
        }
    }
    render() {
        return (
            <StripeProvider apiKey="pk_test_LwL4RUtinpP3PXzYirX2jNfR">
                <div className="example">
                    <h1>React Stripe Elements Example</h1>
                    <Elements>
                        <CheckoutForm />
                    </Elements>
                </div>
            </StripeProvider>
        );
    }
}

export default connect(mapStateToProps)(Billing);
