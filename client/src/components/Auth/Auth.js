import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from "firebase";
import { addUser } from '../../actions';

// Initialize Firebase
import { FIREBASE_CONFIG } from '../../config';
firebase.initializeApp(FIREBASE_CONFIG);

function mapStateToProps(state) {
    return {
        state
    };
}

class Auth extends Component {
    state = {
        email: '',
        password: '',
        authenticated: {}
    }

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    
    handleSignUp = (e) => {
        const user = {
            email: this.state.email,
            password: this.state.password,
            authType: "signup"
        }
        this.props.addUser(user);
    }

    render() {
        console.log(this.props.state)
        return (
            <div>
                <div className='flex-column-centered'>
                    <input type='email' name='email' onChange={this.handleInput} />
                    <input type='password' name='password' onChange={this.handleInput} />
                    <button onClick={this.handleSignUp}>Sign-Up</button>
                    <button onClick={this.handleSignIn}>Sign-In</button>
                </div>
                <div className='flex-column-centered'>
                    <div>USER INFORMATION: </div>
                    <div>email: {this.state.authenticated.email}</div>
                    <div>uid: {this.state.authenticated.uid}</div>
                    {/* <div>providerData: {this.state.authenticated.providerData}</div> */}
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps, {addUser}
)(Auth);