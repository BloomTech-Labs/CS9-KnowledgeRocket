import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';
// Material Components
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
    margin: 1rem 0 !important;
`;

const ErrorMessage = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    color: red;
    font-size: 1rem;
    margin-bottom: 1rem;
`;

const SuccessWindow = styled(Card)`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    border: 1px solid black;
    text-decoration: none;
    h1 {
        display: flex;
        justify-content: center;
        font-size: 1rem;
        font-weight: bold;
        color: rgb(116, 167, 82);
        width: 100%;
        padding: 1rem;
        background-color: rgb(220, 253, 198) !important;
        border-radius: 0.5rem;
        border: 2px solid rgb(116, 167, 82) !important;
    }
`;

const SuccessButton = styled(CPCButton)`
    text-decoration: none;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            complete: false,
            ccStatus: true,
            transactionStatus: true,
            open: false,
        };
    }

    submit = async ev => {
        let { token } = await this.props.stripe.createToken({ name: 'Name' });
        if (token) {
            axios
                .post(`${serverURL}/${this.props.type}`, {
                    token: token.id,
                    uid: this.props.uid,
                    id: this.props.id,
                })
                .then(receivedPackage => {
                    this.props.actionClick();
                    this.props.refreshUser(receivedPackage.data.user);
                    this.setState({ complete: true });
                })
                .catch(() => {
                    this.setState({ transactionStatus: false });
                });
        } else {
            this.setState({ ccStatus: false });
        }
    };

    render() {
        if (this.state.complete)
            return (
                <div className="checkout">
                    <SuccessWindow>
                        <h1>Transaction Complete! Thank you!</h1>
                        <StyledLink to="/rocket">
                            <SuccessButton>Return To Rockets</SuccessButton>
                        </StyledLink>
                    </SuccessWindow>
                </div>
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
                <CPCButton onClick={this.submit}>Buy Now</CPCButton>
            </div>
        );
    }
}
export default injectStripe(CheckoutForm);
