import { LOGIN_USER, ADD_USER, LOGOUT_USER } from '../actions';

const defaultState = {
    // Initialize Students Redux State/Store Portion Here
    uid: '',
    email: '',
    token: '',
    account: 'Free',
    authenticated: false
};

export default (state = defaultState, action) => {
    let StateCopy = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case ADD_USER:
            StateCopy.uid = action.payload.uid;
            StateCopy.email = action.payload.email;
            StateCopy.token = action.payload.token;
            StateCopy.authenticated = true;
            return StateCopy;
        case LOGIN_USER:
            StateCopy.uid = action.payload.uid;
            StateCopy.email = action.payload.email;
            StateCopy.token = action.payload.token;
            StateCopy.authenticated = true;
            return StateCopy;
        case LOGOUT_USER:
            return defaultState;
        default:
            return state;
    }
}