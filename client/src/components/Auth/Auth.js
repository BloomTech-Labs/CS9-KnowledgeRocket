import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from "firebase";

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
        authenticated: {

        }
    }

    handleSignUp = (e) => {
        // console.log(FIREBASE_CONFIG)
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(response => {
                console.log('response after auth',response);
                this.handleAuthenticated();
            })
            .catch(error => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ...
            });
    }

    handleSignIn = (e) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(response => {
                console.log('response after auth', response);
                this.handleAuthenticated();
            })
            .catch(error => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ...
            });
    }

    handleAuthenticated = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                const displayName = user.displayName;
                const email = user.email;
                const emailVerified = user.emailVerified;
                const photoURL = user.photoURL;
                const isAnonymous = user.isAnonymous;
                const uid = user.uid;
                const providerData = user.providerData;
                this.setState({ authenticated: { displayName, email, emailVerified, photoURL, isAnonymous, uid, providerData } });
                console.log('After authenticated User Object: ', user);
                console.log('\n', 'LoggedInUser: ',
                    '\n', displayName,
                    '\n', email,
                    '\n', emailVerified,
                    '\n', photoURL,
                    '\n', isAnonymous,
                    '\n', uid,
                    '\n', providerData)
                // ...
            } else {
                // User is signed out.
                // ...
            }
        });
    }

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
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
    mapStateToProps,
)(Auth);