import axios from 'axios';
import config from '../config';

// Set Up Back End URL: Change config for deployment or switch to ENV
const url = config.backend || 'http://localhost:5000';

// Dummy Action Types
export const ADD_ROCKET = 'ADD_ROCKET';
export const GET_ROCKETS = 'GET_ROCKETS';
export const REMOVE_ROCKET = 'REMOVE_ROCKET';
export const UPDATE_ROCKET = 'UPDATE_ROCKET';

// User Action Types
export const ADD_USER = 'ADD_USER';

// Dummy Action to Add Rockets
export const addRocket = (rocket) => {
    let response = axios.post(`${url}/rocket/add`, rocket)
    return {
        type: ADD_ROCKET,
        payload: response
    };
};

// User Actions
export const addUser = (user) => {
    let response = axios.post(`${url}/api/auth`, user)
    return {
        type: ADD_USER,
        payload: user
    }
}
