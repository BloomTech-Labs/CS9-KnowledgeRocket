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
    describe('handleGoogleResponse', () => {
        const correctToken = '123abc';
        // clear all actions from mock
        // NO longer able to mock token tests, because they are Checked by Auth System now.
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
                },
            };
            expect(handleFacebookResponse(response, correctToken)).toEqual(expected);
        });
    });
});
