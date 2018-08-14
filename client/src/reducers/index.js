import { combineReducers } from 'redux';
import rocket from './rocketReducers.js';
import student from './studentReducers.js';
import user from './userReducers.js';

const rootReducer = combineReducers({
    rocket,
    student,
    user
});

export default rootReducer;