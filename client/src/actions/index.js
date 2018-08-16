import axios from 'axios';
import config from '../config';
import firebase from 'firebase';
// Set Up Back End URL: Change config for deployment or switch to ENV
const url = config.backend || 'http://localhost:5000';

// Dummy Action Types
export const ADD_ROCKET = 'ADD_ROCKET';
export const GET_ROCKETS = 'GET_ROCKETS';
export const REMOVE_ROCKET = 'REMOVE_ROCKET';
export const UPDATE_ROCKET = 'UPDATE_ROCKET';

// User Action Types
export const ADD_USER = 'ADD_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

// Dummy Action to Add Rockets
export const addRocket = rocket => {
    let response = axios.post(`${url}/rocket/add`, rocket);
    return {
        type: ADD_ROCKET,
        payload: response,
    };
};

// User Actions
export const addUser = user => async dispatch => {
    try {
        let response = await axios.post(`${url}/api/auth`, user);
        console.log('response in loginuser:', response.data);
        dispatch({ type: ADD_USER, payload: response.data });
    } catch (err) {
        console.log(err);
        //dispatch({ type: LOGIN_USER_FAILURE, payload: err });
    }
};

export const loginUser = user => async dispatch => {
    try {
        let response = await axios.post(`${url}/api/auth`, user);
        console.log('response in loginuser:', response.data);
        dispatch({ type: LOGIN_USER, payload: response.data });
    } catch (err) {
        console.log(err);
        //dispatch({ type: LOGIN_USER_FAILURE, payload: err });
    }
};

export const loginUserGoogle = user => async dispatch => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
        .auth()
        .signInWithPopup(provider)
        .then(response => {
            // console.log(`RESPONSE ${response}`);
            const token = response.credential.accessToken;
            const user = response.user;
        })
        .catch(err => {
            const errorCode = err.code;
            const errorMessage = err.message;
            console.log(errorCode, errorMessage);
        });
};

export const logOutUser = () => async dispatch => {
    try {
        dispatch({ type: LOGOUT_USER });
    } catch (err) {
        console.log(err);
    }
};
