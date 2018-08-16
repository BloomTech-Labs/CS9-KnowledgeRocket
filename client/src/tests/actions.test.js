import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
// Actions
import { handleGoogleResponse } from '../actions';

const mockStore = configureStore();
const store = mockStore();

describe('action creators', () => {
	describe('handleGoogleResponse', () => {
		// clear all actions from mock
		beforeEach(() => {
			store.clearActions();
		});

		it('should create a user object from a response object', async () => {
			const expected = {
				uid: 'abc',
				email: 'johndoe@yahoo.com',
				token: '123abc',
				authType: '3rdParty',
			};

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
});
