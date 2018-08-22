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
export const UPGRADE_USER = 'UPGRADE_USER';

// Cohort Action Types
export const ADD_COHORT = 'ADD_COHORT';
export const ADDING_COHORT = 'ADDING_COHORT';
export const ADD_COHORT_FAILURE = 'ADD_COHORT_FAILURE';

// User Action Types
export const ADD_USER = 'ADD_USER';
export const ADDING_USER = 'ADDING_USER';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGGING_IN_USER = 'LOGGING_IN_USER';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER = 'LOGOUT_USER';

// Breadcrumb Actions
export const UPDATE_BREADCRUMBS = 'UPDATE_BREADCRUMBS';

// Dummy Action to Add Rockets
export const addRocket = rocket => {
    let response = axios.post(`${url}/rocket/add`, rocket);
    return {
        type: ADD_ROCKET,
        payload: response,
    };
};

// COHORT ACTIONS
export const addCohort = (cohort, id) => async dispatch => {
    dispatch({ type: ADDING_COHORT });
    try {
        let response = await axios.post(`${url}/api/cohort`, { cohort, id });
        dispatch({ type: ADD_COHORT, payload: response.data });
    } catch (err) {
        dispatch({ type: ADD_COHORT_FAILURE });
    }
};

// User Actions
export const addUser = user => async dispatch => {
    dispatch({ type: ADDING_USER });
    try {
        let response = await axios.post(`${url}/api/auth`, user);
        dispatch({ type: ADD_USER, payload: response.data });
    } catch (err) {
        dispatch({ type: ADD_USER_FAILURE });
    }
};
export const upgradeUser = user => async dispatch => {
    dispatch({ type: UPGRADE_USER });
    try {
        let response = await axios.put(`${url}/api/user/${user._id}`, user);
        dispatch({ type: UPGRADE_USER, payload: response.data });
    } catch (err) {
        dispatch({ type: ADD_USER_FAILURE });
    }
};

export const loginUser = user => async dispatch => {
    dispatch({ type: LOGGING_IN_USER });
    try {
        let response = await axios.post(`${url}/api/auth`, user);
        dispatch({ type: LOGIN_USER, payload: response.data });
    } catch (err) {
        dispatch({ type: LOGIN_USER_FAILURE });
    }
};

// extract uid, email, token from response.user
export const handleGoogleResponse = (res, correctToken) => {
    const { uid, email } = res.user;
    return { uid, email, token: correctToken, authType: 'google' };
};

// TODO SEND DATA TO AN ENDPOINT
export const loginUserGoogle = () => async dispatch => {
    dispatch({ type: LOGGING_IN_USER });
    const provider = new Firebase.auth.GoogleAuthProvider();

    try {
        let response = await Firebase.auth().signInWithPopup(provider);
        // Get the correct token for Auth Verification.
        let correctToken = await Firebase.auth().currentUser.getIdToken();
        const user = handleGoogleResponse(response, correctToken);
        // This is where we send to the server the Oauth user Info to check against DB.
        let serverResponse = await axios.post(`${url}/api/auth`, user);
        return dispatch({ type: LOGIN_USER, payload: serverResponse.data });
    } catch (err) {
        dispatch({ type: LOGIN_USER_FAILURE });
    }
};

export const handleFacebookResponse = (res, correctToken) => {
    const { uid, email } = res.user;
    return { uid, email, token: correctToken, authType: 'facebook' };
};

export const loginUserFacebook = () => async dispatch => {
    dispatch({ type: LOGGING_IN_USER });
    const provider = new Firebase.auth.FacebookAuthProvider();

    try {
        let response = await Firebase.auth().signInWithPopup(provider);
        // Get the correct token for Auth Verification.
        let correctToken = await Firebase.auth().currentUser.getIdToken();
        const user = handleFacebookResponse(response, correctToken);
        // This is where we send to the server the Oauth user Info to check against DB.
        let serverResponse = await axios.post(`${url}/api/auth`, user);
        return dispatch({ type: LOGIN_USER, payload: serverResponse.data });
    } catch (err) {
        dispatch({ type: LOGIN_USER_FAILURE });
    }
};

export const handleTwitterResponse = (res, correctToken) => {
    const { uid } = res.user;
    return {
        uid,
        email: res.additionalUserInfo.profile.email,
        token: correctToken,
        authType: 'twitter',
    };
};

export const loginUserTwitter = () => async dispatch => {
    dispatch({ type: LOGGING_IN_USER });
    const provider = new Firebase.auth.TwitterAuthProvider();

    try {
        let response = await Firebase.auth().signInWithPopup(provider);
        // Get the correct token for Auth Verification.
        let correctToken = await Firebase.auth().currentUser.getIdToken();
        const user = handleTwitterResponse(response, correctToken);
        // This is where we send to the server the Oauth user Info to check against DB.
        let serverResponse = await axios.post(`${url}/api/auth`, user);
        return dispatch({ type: LOGIN_USER, payload: serverResponse.data });
    } catch (err) {
        dispatch({ type: LOGIN_USER_FAILURE });
    }
};

export const logOutUser = () => async dispatch => {
    try {
        dispatch({ type: LOGOUT_USER });
    } catch (err) {
        console.log(err);
    }
};

/* BREADCRUMBS GENERATION */
export const generateBreadCrumbs = path => {
    return {
        type: UPDATE_BREADCRUMBS,
        payload: path,
    };
};
