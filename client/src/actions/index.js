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

// TODO SEND DATA TO AN ENDPOINT
export const loginUserGoogle = user => async dispatch => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    let response = await firebase.auth().signInWithPopup(provider);
    console.log(`response ${JSON.stringify(response)}`);
    const token = response.credential.accessToken;
    const { uuid, email } = response.user;
    console.log(`token ${token}`);
    console.log(`user ${JSON.stringify(user)}`);
    dispatch({
      type: LOGIN_USER,
      payload: {
        uid: uuid,
        email: email,
        token: token,
      },
    });
  } catch (err) {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.log(errorCode, errorMessage);
  }
};

// TODO DISPATCH UUID EMAIL TOKEN
export const loginUserFacebook = user => async dispatch => {
  const provider = new firebase.auth.FacebookAuthProvider();

  try {
    let response = await firebase.auth().signInWithPopup(provider);
    console.log(`response ${JSON.stringify(response)}`);
    const token = response.credential.accessToken;
    const { uuid, email } = response.user;
    console.log(`token ${token}`);
    console.log(`user ${JSON.stringify(user)}`);
    dispatch({
      type: LOGIN_USER,
      payload: {
        uid: uuid,
        email: email,
        token: token,
      },
    });
  } catch (err) {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.log(errorCode, errorMessage);
  }
};

// TODO DISPATCH UUID EMAIL TOKEN
export const loginUserTwitter = user => async dispatch => {
  const provider = new firebase.auth.TwitterAuthProvider();

  try {
    let response = await firebase.auth().signInWithPopup(provider);
    console.log(`response ${JSON.stringify(response)}`);
    const token = response.credential.accessToken;
    const secret = response.credential.secret;
    const { uid, email } = response.user;
    dispatch({
      type: LOGIN_USER,
      payload: {
        uid: uid,
        email: email,
        token: token,
      },
    });
  } catch (err) {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.log(errorCode, errorMessage);
  }
};

export const logOutUser = () => async dispatch => {
  try {
    dispatch({ type: LOGOUT_USER });
  } catch (err) {
    console.log(err);
  }
};
