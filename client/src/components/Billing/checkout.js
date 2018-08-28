import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import { Card } from '../../../node_modules/@material-ui/core';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';

const serverURL = process.env.REACT_APP_Stripe_Url;

const CPCButton = styled(Button)`
    color: #eeeeee !important;
    border: 1px solid rgb(119, 136, 153);
    background-color: ${props => (props.warning ? 'orange' : '#000000')} !important;
    width: 100%;
    margin-bottom: 1rem !important;
`;

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
                    <FormLabel component="legend" className="legend">
                        Payment Info
                    </FormLabel>
                    <CardElement className="checkoutBoxes" />
                </Card>
                <CPCButton className="submitButton" onClick={this.submit}>
                    Buy Now
                </CPCButton>
            </div>
        );
    }
}
export default injectStripe(CheckoutForm);
