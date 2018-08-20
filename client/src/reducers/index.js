import { combineReducers } from 'redux';
import rocket from './rocketReducers.js';
import student from './studentReducers.js';
import user from './userReducers.js';
import breadcrumb from './breadcrumbReducers.js';

const rootReducer = combineReducers({
    rocket,
    student,
    user,
    breadcrumb
});

export default rootReducer;