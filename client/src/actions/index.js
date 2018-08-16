import axios from 'axios';
import Firebase from 'firebase';
// Set Up Back End URL: Change config for deployment or switch to ENV
// process.env.server set to heroku deployment root, already set on deployed version.
const url = process.env.REACT_APP_SERVER;

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRE_API,
  authDomain: process.env.REACT_APP_FIRE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIRE_DB_URL,
  projectId: process.env.REACT_APP_FIRE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIRE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIRE_SENDER_ID,
};

Firebase.initializeApp(firebaseConfig);

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

// extract uid, email, token from response.user
export const handleGoogleResponse = res => {
  const token = res.credential.accessToken;
  const { uid, email } = res.user;
  console.log(`token ${token}`);
  console.log(`user ${JSON.stringify(res.user)}`);
  const user = {
    uid: uid,
    email: email,
    token: token,
    authType: '3rdParty',
  };
  return user;
};

// TODO SEND DATA TO AN ENDPOINT
export const loginUserGoogle = () => async dispatch => {
  const provider = new Firebase.auth.GoogleAuthProvider();
  try {
    let response = await Firebase.auth().signInWithPopup(provider);

    const user = handleGoogleResponse(response);
    return dispatch({
      type: LOGIN_USER,
      payload: {
        uid: user.uid,
        email: user.email,
        token: user.token,
      },
    });
  } catch (err) {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.log(errorCode, errorMessage);
  }
};

export const handleFacebookResponse = res => {
  const token = res.credential.accessToken;
  const { uid, email } = res.user;
  console.log(`token ${token}`);
  console.log(`user ${JSON.stringify(res.user)}`);
  const user = {
    uid: uid,
    email: email,
    token: token,
    authType: '3rdParty',
  };
  return user;
};

export const loginUserFacebook = () => async dispatch => {
  const provider = new Firebase.auth.FacebookAuthProvider();

  try {
    let response = await Firebase.auth().signInWithPopup(provider);
    console.log(`response ${JSON.stringify(response)}`);
    const user = handleFacebookResponse(response);
    return dispatch({
      type: LOGIN_USER,
      payload: {
        uid: user.uid,
        email: user.email,
        token: user.token,
      },
    });
  } catch (err) {
    const errorCode = err.code;
    const errorMessage = err.message;
    console.log(errorCode, errorMessage);
  }
};

export const handleTwitterResponse = res => {
  const token = res.credential.accessToken;
  const { uid, email } = res.user;
  console.log(`token ${token}`);
  console.log(`user ${JSON.stringify(res.user)}`);
  const user = {
    uid: uid,
    email: email,
    token: token,
    authType: '3rdParty',
  };
  return user;
};

export const loginUserTwitter = () => async dispatch => {
  const provider = new Firebase.auth.TwitterAuthProvider();

  try {
    let response = await Firebase.auth().signInWithPopup(provider);
    const user = handleTwitterResponse(response);
    return dispatch({
      type: LOGIN_USER,
      payload: {
        uid: user.uid,
        email: user.email,
        token: user.token,
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
