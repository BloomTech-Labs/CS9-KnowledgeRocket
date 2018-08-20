import React from 'react';
import ReactDOM from 'react-dom';
// Actions
import {
	handleGoogleResponse,
	handleTwitterResponse,
	handleFacebookResponse,
	addUser,
} from '../actions';

describe('action creators', () => {
	describe('addUser', () => {
		it('should accept a user object as an argument', () => {
			const expected = {
				email: expect.any(String),
				password: expect.any(String),
				authType: expect.any(String),
			};

			const user = {
				email: 'knowledgerocket@gmail.com',
				password: 'admin',
				authType: 'add me to the db',
			};

			expect(user).toHaveProperty('email');
			expect(user).toHaveProperty('password');
			expect(user).toHaveProperty('authType');
			expect(user).toMatchObject(expected);
		});
	});

	describe('handleGoogleResponse', () => {
		// clear all actions from mock
            const expected = {
                uid: 'abc',
                email: 'johndoe@yahoo.com',
                authType: 'google',
                token: correctToken,
            };

            const response = {
                user: {
                    uid: 'abc',
                    email: 'johndoe@yahoo.com',
                },
            };
            expect(handleGoogleResponse(response, correctToken)).toEqual(expected);
        });

        describe('handleTwitterResponse', () => {
            it('should create a user object from a response object', async () => {
                const correctToken = '123abc';

                const expected = {
                    uid: 'abc',
                    email: 'johndoe@yahoo.com',
                    authType: 'twitter',
                    token: correctToken,
                };

                const response = {
                    user: {
                        uid: 'abc',
                        email: '',
                    },
                    additionalUserInfo: { profile: { email: 'johndoe@yahoo.com' } },
                };
                expect(handleTwitterResponse(response, correctToken)).toEqual(expected);
            });
        });

        describe('handleFacebookResponse', () => {
			it('should create a user object from a response object', async () => {
				const correctToken = '789jkl';
				
                const expected = {
                    uid: 'jkl',
                    email: 'janedoe@lambda.com',
					authType: 'facebook',
					token: correctToken,
                };
                
                // describes response object from async call to firebase.auth()
                const response = {
                    user: {
                        uid: 'jkl',
                        email: 'janedoe@lambda.com',
                    }
                };
                expect(handleFacebookResponse(response, correctToken)).toEqual(expected);
            });
        });
    });
});
