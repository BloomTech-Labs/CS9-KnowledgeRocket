import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';
const serverURL = process.env.REACT_APP_Stripe_Url;
class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = { complete: false };
        this.submit = this.submit.bind(this);
    }
    async submit(ev) {
        let { token } = await this.props.stripe.createToken({ name: 'Name' });
        let response = await axios.post(`${serverURL}`, {
            token: token.id,
            uid: this.props.uid,
        });
        if (response) this.setState({ complete: true });
    }
    render() {
        if (this.state.complete) return <h1>Purchase Complete!!</h1>;
        return (
            <div className="checkout">
                <p>Would you like to complete the purchase?</p>
                <CardElement />
                <button onClick={this.submit}>Send</button>
            </div>
        );
    }
}
export default injectStripe(CheckoutForm);
