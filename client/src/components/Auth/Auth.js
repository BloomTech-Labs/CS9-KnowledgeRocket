import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import {
    addUser,
    loginUser,
    loginUserGoogle,
    loginUserFacebook,
    loginUserTwitter,
    generateBreadCrumbs,
} from '../../actions';
// MaterialComponents
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import Progress from '../Progress/Progress';
import AuthBackside from './AuthBackside';

function mapStateToProps(state) {
    return {
        user: state.user,
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

const StyledFormContainer = styled.div`
    padding-top: 30px;
    padding-right: 11.1rem;
    display: flex;

    @media (max-width: 1150px) {
        width: 40rem;
        padding-right: 0.1rem;
    }

    @media (max-width: 500px) {
        width: 80%;
        margin: 0 auto;
        padding-right: 0;
    }
`;

const StyledFormCard = styled(Card)`
    backface-visibility: hidden;
    margin-top: 110px;
    margin-right: 11.1rem;
    display: flex;
    flex-direction: row;
    height: 400px;
    width: 50rem;
    overflow: visible;
    transform-origin: 25% 50%;
    transform-style: preserve-3d;
    transition: all 1s ease-in-out;

    @media (max-width: 700px) {
        height: 100%;
    }
`;

const StyledCardContent = styled(CardContent)`
    background-color: #39d1b4;
    width: 100%;
    text-align: center;
    font-size: 1.5rem;
`;

const StyledFormHeader = styled(StyledCardContent)`
    display: block;
    background-color: #fff;
    font-weight: 300;
    line-height: 40px;
    color: #39d1b4;
    width: 100%;
    padding: 0;
    flex-direction: row;
    height: 300px;
    width: 800px;
`;

const StyledCardContent = styled(CardContent)`
    background-color: #39d1b4;
    width: 100%;
    text-align: center;
    font-size: 1.5rem;
`;

const StyledFormHeader = styled(StyledCardContent)`
    background-color: #fff;
    font-weight: 300;
    line-height: 40px;
    color: #39d1b4;
    width: 100%;
    padding: 0;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`;

const StyledInputContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    height: 100%;
    padding: 10px;
`;

const FieldSet = styled.div`
    width: 50%;
    @media (max-width: 700px) {
        width: 20rem;
    }
`;

const FieldSetSocial = styled(FieldSet)`
    padding-bottom: 80px;
`;

const StyledInput = styled.input`
    background-color: inherit;
    width: 250px;
    height: 30px;
    color: #5b7383;
    font-weight: 600;
    font-size: 1rem;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.6);
    margin: 10px;

    &:focus {
        outline: none;
    }

    &::placeholder {
        color: #fff;
        font-weight: 300;
        opacity: 0.7;
    }

    &:focus,
    &:valid {
        border-color: white;
    }
`;

const StyledButton = styled.button`
    font-weight: 600;
    font-size: 1rem;
    color: #fff;
    background-color: inherit;
    width: 250px;
    height: 50px;
    border: 1px solid #fff;
    border-radius: 25px;
    margin: 10px 0;

    &:focus {
        outline: none;
    }

    &:hover {
        background-color: HSLA(0, 0%, 100%, 0.2);
    }
`;

const StyledGoogleBtn = styled(StyledButton)`
    margin-top: 50px;

    @media (max-width: 700px) {
        margin-top: 0;
    }
`;

class Auth extends Component {
    state = {
        email: '',
        password: '',
        authenticated: {},
        success: true,
        flipStatus: false,
    };

    componentDidMount() {
        this.props.user.success === false
            ? this.setState({ success: false })
            : this.setState({ success: true });
        this.props.generateBreadCrumbs(this.props.history.location.pathname);
    }

    handleFlip = () => {
        this.setState({ flipStatus: true });
    };

    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSignUp = e => {
        const user = {
            email: this.state.email,
            password: this.state.password,
            authType: 'signup',
        };
        this.props.addUser(user);
        this.setState({ attempts: this.state.attempts + 1 });
        this.handleFlip();
    };

    handleSignIn = e => {
        const user = {
            email: this.state.email,
            password: this.state.password,
            authType: 'signin',
        };
        this.props.loginUser(user);
        this.setState({ attempts: this.state.attempts + 1 });
        this.handleFlip();
    };

    handleSignInGoogle = e => {
        this.props.loginUserGoogle();
        this.handleFlip();
    };

    handleSignInFacebook = e => {
        this.props.loginUserFacebook();
        this.handleFlip();
    };

    handleSignInTwitter = e => {
        this.props.loginUserTwitter();
        this.handleFlip();
    };

    render() {
        console.log(`AUTH PROPS ${JSON.stringify(this.props)}`);
        const { classes } = this.props;
        const flip = { transform: 'translate(0, 0) rotateX(180deg)' };

        return (
            <StyledFormContainer>
                <StyledFormCard
                    className={classes.root}
                    style={this.state.flipStatus ? flip : null}
                >
                    <StyledCardContent className={classes.root}>
                        <StyledFormHeader>Sign In or Sign Up</StyledFormHeader>
                        <StyledInputContainer>
                            <FieldSet>
                                <StyledInput
                                    type="text"
                                    name="email"
                                    onChange={this.handleInput}
                                    placeholder="email"
                                    required
                                />
                                <StyledInput
                                    type="password"
                                    name="password"
                                    onChange={this.handleInput}
                                    placeholder="password"
                                    required
                                />
                                <StyledButton
                                    style={{ marginTop: '20px' }}
                                    onClick={this.handleSignIn}
                                >
                                    Sign In
                                </StyledButton>
                                <StyledButton onClick={this.handleSignUp}>Sign Up</StyledButton>
                            </FieldSet>
                            <FieldSetSocial>
                                <StyledGoogleBtn onClick={this.handleSignInGoogle}>
                                    <span style={{ padding: '0 0.5rem' }}>
                                        <i class="fab fa-google fa-lg" />
                                    </span>{' '}
                                    Sign In with Google
                                </StyledGoogleBtn>
                                <StyledButton onClick={this.handleSignInFacebook}>
                                    <span style={{ padding: '0 0.5rem' }}>
                                        <i class="fab fa-facebook-f fa-lg" />
                                    </span>{' '}
                                    Sign In with Facebook
                                </StyledButton>
                                <StyledButton onClick={this.handleSignInTwitter}>
                                    <span style={{ padding: '0 0.5rem' }}>
                                        <i class="fab fa-twitter fa-lg" />
                                    </span>{' '}
                                    Sign in with Twitter
                                </StyledButton>
                            </FieldSetSocial>
                        </StyledInputContainer>
                    </StyledCardContent>
                    {this.props.user.status === 'FAILED' ? (
                        <AuthBackside message={'failed'} />
                    ) : this.props.user.status === 'LOGGING_IN_USER' ? (
                        <AuthBackside message={'loggingIn'} />
                    ) : this.props.user.status === 'ADDING_USER' ? (
                        <AuthBackside message={'addingUser'} />
                    ) : null}
                </StyledFormCard>
                {this.props.user.authenticated ? <Redirect to="/rocket" /> : null}
            </StyledFormContainer>
        );
    }
}

export default connect(mapStateToProps, {
    addUser,
    loginUser,
    loginUserGoogle,
    loginUserFacebook,
    loginUserTwitter,
    generateBreadCrumbs,
})(withStyles(styles)(Auth));
