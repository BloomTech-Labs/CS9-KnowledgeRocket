import { combineReducers } from 'redux';
import rocket from './rocketReducers.js';
import student from './studentReducers.js';

const rootReducer = combineReducers({
    rocket,
    student
});

export default rootReducer;