import { LOGIN_USER, ADD_USER } from '../actions';

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
            StateCopy.authenticated = action.payload.true;
            return StateCopy
        case LOGIN_USER:
            console.log('inside reducers payload',action.payload)
            StateCopy.uid = action.payload.uid;
            StateCopy.email = action.payload.email;
            StateCopy.token = action.payload.token;
            StateCopy.authenticated = action.payload.true;
            return StateCopy
        default:
            return state;
    }
}