//@ts-check
import {
    LOGIN_USER,
    LOGGING_IN_USER,
    ADDING_USER,
    ADD_USER,
    LOGOUT_USER,
    LOGIN_USER_FAILURE,
    ADD_USER_FAILURE,
    UPGRADE_USER,
    ADD_COHORT,
    ADD_ROCKET,
    ADDING_ROCKET,
    DELETE_ROCKET,
    DELETING_ROCKET,
    ADD_STUDENT,
    ADDING_STUDENT,
    ADD_STUDENT_FAILURE,
    DELETE_STUDENT,
    APPENDING_ROCKETS,
    APPEND_ROCKETS,
    APPENDING_ROCKETS_FAILED,
    UPDATING_USER,
    UPDATE_USER_FAILURE,
    UPDATE_USER,
    UPLOAD_CSV,
    UPLOADING_CSV,
    UPLOAD_CSV_FAILURE,
    EXPORT_CSV,
    EXPORTING_CSV,
    EXPORT_CSV_FAILURE,
    RESETTING_USER_PASSWORD,
    USER_PASSWORD_RESET,
    USER_PASSWORD_RESET_FAILED,
    SNACK_CLEAR,
    REFRESHED_USER,
} from '../actions';

const defaultState = {
    // Initialize Students Redux State/Store Portion Here
    uid: '',
    email: '',
    token: '',
    account: 'Free',
    authenticated: false,
    status: 'INITIAL',
    students: [],
    rockets: [],
    cohorts: [{ title: '', students: [{}], teacher: {}, rockets: [{ rocketId: {} }] }],
    message: '',
    exportCSV: [],
};

export default (state = defaultState, action) => {
    let StateCopy = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case SNACK_CLEAR:
            StateCopy.message = '';
            StateCopy.status = SNACK_CLEAR;
            return StateCopy;
        case ADDING_ROCKET:
            StateCopy.status = ADDING_ROCKET;
            return StateCopy;
        case DELETING_ROCKET:
            StateCopy.status = DELETING_ROCKET;
            return StateCopy;
        case DELETE_ROCKET:
            StateCopy.status = ADD_ROCKET;
            // update cohort rockets
            let target = [];
            StateCopy.cohorts.forEach((c, cIndex) => {
                c.rockets.forEach((r, rIndex) => {
                    if (r.rocketId._id === action.payload.rocketId._id) {
                        target.push([cIndex, rIndex]);
                    }
                });
            });
            target.forEach(t => {
                StateCopy.cohorts[t[0]].rockets.splice(t[1], 1);
            });
            // update user rockets
            StateCopy.rockets.forEach((rocket, index) => {
                if (rocket._id === action.payload.rocketId /*DO NOT INCLUDE ._ID*/) {
                    StateCopy.rockets.splice(index, 1);
                }
            });
            StateCopy.message = 'You deleted a rocket from your account!';
            StateCopy.authenticated = true;
            return StateCopy;
        case ADD_ROCKET:
            StateCopy.status = ADD_ROCKET;
            StateCopy = { ...StateCopy, ...action.payload };
            StateCopy.message = 'You added or updated a rocket!';
            StateCopy.authenticated = true;
            return StateCopy;
        case APPEND_ROCKETS:
            StateCopy = action.payload;
            StateCopy.authenticated = true;
            StateCopy.status = APPEND_ROCKETS;
            StateCopy.message = 'You successfully set a rocket for your class!';
            return StateCopy;
        case APPENDING_ROCKETS:
            StateCopy.status = APPENDING_ROCKETS;
            return StateCopy;
        case APPENDING_ROCKETS_FAILED:
            StateCopy.status = APPENDING_ROCKETS_FAILED;
            return StateCopy;
        case ADDING_USER:
            StateCopy.status = ADDING_USER;
            return StateCopy;
        case ADD_USER:
            StateCopy = { ...StateCopy, ...action.payload };
            StateCopy.authenticated = true;
            StateCopy.status = ADD_USER;
            return StateCopy;
        case UPGRADE_USER:
            StateCopy = { ...StateCopy, ...action.payload };
            StateCopy.authenticated = true;
            StateCopy.status = UPGRADE_USER;
            return StateCopy;
        case REFRESHED_USER:
            StateCopy = { ...StateCopy, ...action.payload };
            StateCopy.authenticated = true;
            StateCopy.status = REFRESHED_USER;
            StateCopy.message = 'You successfully made a payment!';
            return StateCopy;
        case UPDATING_USER:
            StateCopy.status = UPDATING_USER;
            return StateCopy;
        case UPDATE_USER_FAILURE:
            StateCopy.status = UPDATE_USER_FAILURE;
            return StateCopy;
        case UPDATE_USER:
            StateCopy = { ...StateCopy, ...action.payload };
            StateCopy.status = UPDATE_USER;
            StateCopy.authenticated = true;
            StateCopy.message = 'You successfully updated your credentials';
            return StateCopy;
        case ADD_COHORT:
            StateCopy = { ...StateCopy, ...action.payload };
            StateCopy.message = 'You added a class!';
            StateCopy.authenticated = true;
            StateCopy.status = ADD_COHORT;
            return StateCopy;
        case ADDING_STUDENT:
            StateCopy.status = ADDING_STUDENT;
            return StateCopy;
        case ADD_STUDENT_FAILURE:
            StateCopy.status = ADD_STUDENT_FAILURE;
            return StateCopy;
        case ADD_STUDENT:
            StateCopy = action.payload;
            StateCopy.message = 'You added a student to your class!';
            StateCopy.authenticated = true;
            StateCopy.status = ADD_STUDENT;
            return StateCopy;
        case DELETE_STUDENT:
            StateCopy.status = DELETE_STUDENT;
            StateCopy.message = 'You deleted a student from your class!';
            let cohortIdx = -1; // Initialize as a non index
            let studentIdx = -1; // Initialize as a non index
            StateCopy.cohorts.forEach((cohort, index) => {
                let students = cohort.students;
                for (let i = 0; i < students.length; i++) {
                    if (students[i]._id === action.payload._id) {
                        cohortIdx = index; // When Found save Cohort Index
                        studentIdx = i; // When Found save Student Index
                    }
                }
            });
            StateCopy.cohorts[cohortIdx].students.splice(studentIdx, 1);
            StateCopy.authenticated = true;
            return StateCopy;
        case UPLOAD_CSV:
            StateCopy = action.payload;
            StateCopy.message = 'You successfully uploaded your students!';
            StateCopy.authenticated = true;
            StateCopy.status = UPLOAD_CSV;
            return StateCopy;
        case UPLOADING_CSV:
            StateCopy.status = UPLOADING_CSV;
            return StateCopy;
        case UPLOAD_CSV_FAILURE:
            StateCopy.status = UPLOAD_CSV_FAILURE;
            return StateCopy;
        case EXPORT_CSV:
            StateCopy.exportCSV = action.payload;
            StateCopy.message = 'You successfully downloaded a list of your students!';
            return StateCopy;
        case EXPORTING_CSV:
            StateCopy.status = EXPORTING_CSV;
            return StateCopy;
        case EXPORT_CSV_FAILURE:
            StateCopy.status = EXPORT_CSV_FAILURE;
            return StateCopy;
        case ADD_USER_FAILURE:
            StateCopy.status = 'FAILED';
            return StateCopy;
        case LOGGING_IN_USER:
            StateCopy.status = LOGGING_IN_USER;
            return StateCopy;
        case LOGIN_USER_FAILURE:
            StateCopy.status = 'FAILED';
            return StateCopy;
        case LOGIN_USER:
            StateCopy = { ...StateCopy, ...action.payload };
            StateCopy.authenticated = true;
            StateCopy.status = LOGIN_USER;
            return StateCopy;
        case RESETTING_USER_PASSWORD:
            StateCopy.status = RESETTING_USER_PASSWORD;
            return StateCopy;
        case USER_PASSWORD_RESET:
            StateCopy.status = USER_PASSWORD_RESET;
            StateCopy.message = 'You successfully reset your password!';
            return StateCopy;
        case USER_PASSWORD_RESET_FAILED:
            StateCopy.status = USER_PASSWORD_RESET_FAILED;
            return StateCopy;
        case LOGOUT_USER:
            StateCopy.message = 'You successfully logged out!';
            return defaultState;
        default:
            return state;
    }
};
