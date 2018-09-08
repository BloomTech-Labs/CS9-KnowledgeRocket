import axios from 'axios';
import Firebase from 'firebase/app';
import 'firebase/auth';
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
export const GET_ROCKETS = 'GET_ROCKETS';
export const REMOVE_ROCKET = 'REMOVE_ROCKET';
export const UPDATE_ROCKET = 'UPDATE_ROCKET';
export const UPGRADE_USER = 'UPGRADE_USER';

// Cohort Action Types
export const ADD_COHORT = 'ADD_COHORT';
export const ADDING_COHORT = 'ADDING_COHORT';
export const ADD_COHORT_FAILURE = 'ADD_COHORT_FAILURE';
export const ADDING_STUDENT = 'ADDING_STUDENT';
export const ADD_STUDENT = 'ADD_STUDENT';
export const ADD_STUDENT_FAILURE = 'ADD_STUDENT_FAILURE';
export const DELETING_STUDENT = 'DELETING_STUDENT';
export const DELETE_STUDENT = 'DELETE_STUDENT';
export const DELETING_STUDENT_FAILURE = 'DELETING_STUDENT_FAILURE';

// User Action Types
export const ADD_USER = 'ADD_USER';
export const ADDING_USER = 'ADDING_USER';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGGING_IN_USER = 'LOGGING_IN_USER';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER = 'LOGOUT_USER';

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATING_USER = 'UPDATING_USER';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const RESETTING_USER_PASSWORD = 'RESETTING_USER_PASSWORD';
export const USER_PASSWORD_RESET = 'USER_PASSWORD_RESET';
export const USER_PASSWORD_RESET_FAILED = 'USER_PASSWORD_RESET_FAILED';

export const REFRESHED_USER = 'REFRESHED_USER';

// Student CSVs
export const UPLOAD_CSV = 'UPLOAD_CSV';
export const UPLOADING_CSV = 'UPLOADING_CSV';
export const UPLOAD_CSV_FAILURE = 'UPLOAD_CSV_FAILURE';

export const EXPORT_CSV = 'EXPORT_CSV';
export const EXPORTING_CSV = 'EXPORTING_CSV';
export const EXPORT_CSV_FAILURE = 'EXPORT_CSV_FAILURE';

// Breadcrumb Actions
export const UPDATE_BREADCRUMBS = 'UPDATE_BREADCRUMBS';

// Rocket Actions
export const ADD_ROCKET = 'ADD_ROCKET';
export const APPEND_ROCKETS = 'APPEND_ROCKETS';
export const APPENDING_ROCKETS = 'APPENDING_ROCKETS';
export const APPENDING_ROCKETS_FAILED = 'APPENDING_ROCKETS_FAILED';
export const ADDING_ROCKET = 'ADDING_ROCKET';
export const DELETING_ROCKET = 'DELETING_ROCKET';
export const DELETE_ROCKET = 'DELETE_ROCKET';

// RESPONSE ROCKET ACTIONS FOR RESULTS
export const FETCHING_RESPONSE = 'FETCHING_RESPONSE';
export const RESPONSE_RECEIVED = 'RESPONSE_RECEIVED';
export const FETCHING_RESPONSE_FAILED = 'FETCHING_RESPONSE_FAILED';

// SNACKBAR TYPES
export const SNACK_CLEAR = 'SNACK_CLEAR';

// Add Rocket Actions
export const addRocket = (rocket, uid) => async dispatch => {
    dispatch({ type: ADDING_ROCKET });
    try {
        // Make sure Server gives the updated user with the rocket in it as response.
        // Remember in Server to add this rocket to current user's array.
        let response = await axios.post(`${url}/api/rocket/add`, { rocket, uid });
        dispatch({ type: ADD_ROCKET, payload: response.data });
    } catch (err) {}
};

// Appends a rocket to the cohorts rocket's scheduled array.
export const appendRocket = (rocketID, startDate, userID, cohortID) => async dispatch => {
    dispatch({ type: APPENDING_ROCKETS });
    try {
        let response = await axios.post(`${url}/api/cohort/appendrocket`, {
            rocketID,
            startDate,
            userID,
            cohortID,
        });
        dispatch({ type: APPEND_ROCKETS, payload: response.data });
    } catch (err) {
        dispatch({ type: APPENDING_ROCKETS_FAILED });
    }
};

export const updateRocket = (rocket, uid) => async dispatch => {
    dispatch({ type: ADDING_ROCKET });
    try {
        // Make sure Server gives the updated user with the rocket in it as response.
        // Remember in Server to add this rocket to current user's array.
        let response = await axios.post(`${url}/api/rocket/update`, { rocket, uid });
        dispatch({ type: ADD_ROCKET, payload: response.data });
    } catch (err) {}
};

export const deleteRocket = rocketId => async dispatch => {
    dispatch({ type: DELETING_ROCKET });
    try {
        // Make sure Server gives the updated user with the rocket in it as response.
        // Remember in Server to add this rocket to current user's array.
        let response = await axios.delete(`${url}/api/rocket/${rocketId}`);
        dispatch({ type: DELETE_ROCKET, payload: { response, rocketId } });
    } catch (err) {}
};

// COHORT ACTIONS
export const addCohort = (cohort, id) => async dispatch => {
    const packagedCohort = { ...cohort, teacher: id };
    dispatch({ type: ADDING_COHORT });
    try {
        let response = await axios.post(`${url}/api/cohort`, { cohort: packagedCohort, id });
        dispatch({ type: ADD_COHORT, payload: response.data });
    } catch (err) {
        dispatch({ type: ADD_COHORT_FAILURE });
    }
};

export const addStudent = (student, teacherID, cohortID) => async dispatch => {
    dispatch({ type: ADDING_STUDENT });
    try {
        let response = await axios.post(`${url}/api/student`, { student, teacherID, cohortID });
        dispatch({ type: ADD_STUDENT, payload: response.data });
    } catch (err) {
        dispatch({ type: ADD_STUDENT_FAILURE });
    }
};

export const deleteStudent = studentID => async dispatch => {
    dispatch({ type: DELETING_STUDENT });
    try {
        let response = await axios.delete(`${url}/api/student/${studentID}`);
        dispatch({ type: DELETE_STUDENT, payload: response.data });
    } catch (err) {
        dispatch({ type: DELETING_STUDENT_FAILURE });
    }
};

// User Actions
export const importCSV = (teacherID, cohortID, studentData) => async dispatch => {
    dispatch({ type: UPLOADING_CSV });
    try {
        let response = await axios.post(`${url}/api/student/importcsv`, {
            teacherID,
            cohortID,
            studentData,
        });
        dispatch({ type: UPLOAD_CSV, payload: response.data });
    } catch (err) {
        dispatch({ type: UPLOAD_CSV_FAILURE });
    }
};

export const exportCSV = cohortID => async dispatch => {
    dispatch({ type: EXPORTING_CSV });
    try {
        let response = await axios.get(`${url}/api/student/exportcsv/${cohortID}`);
        dispatch({ type: EXPORT_CSV, payload: response.data });
    } catch (err) {
        dispatch({ type: EXPORT_CSV_FAILURE });
    }
};

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

export const updateUser = user => async dispatch => {
    dispatch({ type: UPDATING_USER });
    try {
        let response = await axios.put(`${url}/api/auth/${user._id}`, user);
        dispatch({ type: UPDATE_USER, payload: response.data });
    } catch (err) {
        dispatch({ type: UPDATE_USER_FAILURE });
    }
};

// ATTEMPT AT REFRESH USER AFTER BILLING CHANGE
export const refreshUser = userObject => {
    return { type: REFRESHED_USER, payload: userObject };
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

export const resetUserPassword = email => async dispatch => {
    dispatch({ type: RESETTING_USER_PASSWORD });
    try {
        await Firebase.auth().sendPasswordResetEmail(email);
        dispatch({ type: USER_PASSWORD_RESET });
    } catch (err) {
        dispatch({ type: USER_PASSWORD_RESET_FAILED });
    }
};

export const logOutUser = () => async dispatch => {
    try {
        dispatch({ type: LOGOUT_USER });
    } catch (err) {}
};

/* BREADCRUMBS GENERATION */
export const generateBreadCrumbs = path => {
    return {
        type: UPDATE_BREADCRUMBS,
        payload: path,
    };
};

/* RESPONSE ROCKETS FOR RESULTS */
// 'FETCHING_RESPONSE'
// 'RESPONSE_RECEIVED'
// 'FETCHING_RESPONSE_FAILED'
export const getResponseRocketByRocketId = (rocketId, cohortId) => async dispatch => {
    dispatch({ type: FETCHING_RESPONSE });
    try {
        let response = await axios.post(`${url}/api/responserocket/results/`, {
            rocketId,
            cohortId,
        });
        dispatch({ type: RESPONSE_RECEIVED, payload: response.data });
    } catch (err) {
        dispatch({ type: FETCHING_RESPONSE_FAILED });
    }
};

// SNACKBAR ACTIONS
export const clearSnackMessage = () => {
    return { type: SNACK_CLEAR };
};
