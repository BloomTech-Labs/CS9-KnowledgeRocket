import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
// Actions
import { handleGoogleResponse, handleTwitterResponse } from '../actions';

const mockStore = configureStore();
const store = mockStore();

describe('action creators', () => {
	describe('handleGoogleResponse', () => {
		it('should create a user object from a response object', async () => {
			// describes a particular user
			const expected = {
				uid: 'abc',
				email: 'johndoe@yahoo.com',
				token: '123abc',
				authType: '3rdParty',
			};
			// describes response object from async call to firebase.auth()
			const response = {
				credential: {
					accessToken: '123abc',
				},
				user: {
					uid: 'abc',
					email: 'johndoe@yahoo.com',
				},
			};
			expect(handleGoogleResponse(response)).toEqual(expected);
		});
	});

	describe('handleTwitterResponse', () => {
		it('should create a user object from a response object', async () => {
			const expected = {
				uid: 'def',
				email: 'janedoe@yahoo.com',
				token: '456def',
				authType: '3rdParty',
			};
			// describes response object from async call to firebase.auth()
			const response = {
				credential: {
					accessToken: '456def',
				},
				user: {
					uid: 'def',
					email: 'janedoe@yahoo.com',
				},
			};

			expect(handleTwitterResponse(response)).toEqual(expected);
		});
	});
});
