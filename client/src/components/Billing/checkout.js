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
    font-size: 2rem;
    display: flex;
    justify-self: center;
    align-self: center;
    width: 10rem;
    color: #eeeeee !important;
    border: 1px solid rgb(119, 136, 153);
    background-color: ${props => (props.warning ? 'orange' : '#000000')} !important;
    width: 100%;
    margin-bottom: 1rem !important;
`;

const ErrorMessage = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    color: red;
    font-size: 1rem;
    margin-bottom: 1rem;
`

const SuccessWindow = styled(Card)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    border: 1px solid black;
`

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            complete: false,
            ccStatus: true,
            transactionStatus: true,
        };
    }
    submit = async ev => {
        let { token } = await this.props.stripe.createToken({ name: 'Name' });
        if (token) {
            let response = await axios.post(`${serverURL}/${this.props.type}`, {
                token: token.id,
                uid: this.props.uid,
                id: this.props.id,
            }).catch(() =>{
                this.setState({ transactionStatus: false });
            })
            if (response) {
                this.setState({ complete: true });
            }
        } else {
            this.setState({ ccStatus: false });
        }
    };
    render() {
        if (this.state.complete)
            return (
                <SuccessWindow>
                    <h1>Transaction Complete! Thank you!</h1>
                    <Link to="/rocket"><CPCButton>Return To Rockets</CPCButton></Link>
                </SuccessWindow>
            );
        return (
            <div className="checkout">
                {this.state.ccStatus ? null : (
                    <ErrorMessage>{'Please check your card info and try again'}</ErrorMessage>
                )}
                {this.state.transactionStatus ? null : (
                    <ErrorMessage>{'Transaction declined'}</ErrorMessage>
                )}
                <Card className="checkoutCard">
                    <FormLabel component="legend" className="legend">
                        Payment Info
                    </FormLabel>
                    <CardElement className="checkoutBoxes" />
                </Card>
                <CPCButton onClick={this.submit}>
                    Buy Now
                </CPCButton>
            </div>
        );
    }
}
export default injectStripe(CheckoutForm);
