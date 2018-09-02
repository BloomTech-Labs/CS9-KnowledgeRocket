import React, { Component } from 'react';
import Styled from 'styled-components';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { resetUserPassword } from '../../actions';
import {
    StyledCardContent,
    StyledFormHeader,
    StyledInputContainer,
    FieldSet,
    StyledInput,
    StyledButton,
} from './Auth';

function mapStateToProps(state) {
    return {
        state,
    };
}

const styles = {
    root: {
        padding: 0,
        overflow: 'visible !important',
    },
    media: {
        height: 140,
    },
};

export const StyledFormContainer = Styled.div`
    font-family: 'Roboto', serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: inherit;
    width: 100%;
    margin: 0;
    box-sizing: border-box;
    border-radius: 0.25rem;
    h4 {
        display: ${props => props.status === '' ? 'none': 'flex'};
        font-size: .8rem;
        color: red;
        font-weight: bold;
        padding: 1rem;
    }
`;

class AuthResetPassword extends Component {
    state = {
        email: 'Please enter your email',
        status: '',
    };

    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleReset = e => {
        const regVar = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
        // If the User Provided a Valid Email.
        if (regVar.test(this.state.email)) {
            // Reset password logic here
            this.props.resetUserPassword(this.state.email);
            // Redirect to Home Page after Password Reset Link Success
            this.props.tryAgain(e);
        } else {
            this.setState({ status: 'Please provide a valid e-mail' });
        }
    };

    clearField = () => {
        if (this.state.email === 'Please enter your email') {
            this.setState({ email: '' });
        }
    };

    render() {
        const { classes } = this.props;
        console.log(this.state);
        return (
            <StyledFormContainer status={this.state.status}>
                <StyledCardContent className={classes.root}>
                    <StyledFormHeader>RESET YOUR PASSWORD?</StyledFormHeader>
                    <StyledInputContainer>
                        <FieldSet>
                            <StyledInput
                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleInput}
                                onClick={this.clearField}
                                onFocus={this.clearField}
                                placeholder="Please enter your email"
                                required
                            />
                            <h4>{this.state.status === '' ? null : this.state.status}</h4>
                            <StyledButton style={{ marginTop: '20px' }} onClick={this.handleReset}>
                                RESET MY PASSWORD
                            </StyledButton>
                            <StyledButton style={{ marginTop: '20px' }} onClick={this.props.tryAgain}>
                                NO THANKS
                            </StyledButton>
                        </FieldSet>
                    </StyledInputContainer>
                </StyledCardContent>
            </StyledFormContainer>
        );
    }
}

export default connect(
    mapStateToProps,
    { resetUserPassword }
)(withStyles(styles)(AuthResetPassword));
