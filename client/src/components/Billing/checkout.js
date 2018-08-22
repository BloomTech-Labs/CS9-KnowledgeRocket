import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import { Card } from '../../../node_modules/@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
const serverURL = process.env.REACT_APP_Stripe_Url;
class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = { complete: false };
    }
    submit = async ev => {
        let { token } = await this.props.stripe.createToken({ name: 'Name' });
        let response = await axios.post(`${serverURL}/${this.props.type}`, {
            token: token.id,
            uid: this.props.uid,
            id: this.props.id,
        });
        if (response) {
            this.setState({ complete: true });
        }
    };
    render() {
        // console.log(this.props.type)
        if (this.state.complete)
            return (
                <div>
                    <h1>Transaction Complete! Thank you!</h1>
                    <Link to="/rocket">Return To Rockets</Link>
                </div>
            );
        return (
            <div className="checkout">
                <Card className="checkoutCard">
                    <FormLabel component="legend">Payment Info</FormLabel>
                    <CardElement className="checkoutBoxes" />
                </Card>
                <button className="submitButton" onClick={this.submit}>
                    Buy Now
                </button>
            </div>
        );
    }
}
export default injectStripe(CheckoutForm);
