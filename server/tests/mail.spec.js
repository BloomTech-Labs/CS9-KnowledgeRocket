const request = require('supertest');
const mail = require('../mail');

describe('testing mail route and capabilities', () => {
    it('exists', () => {
        expect(mail).not.toBeUndefined();
    });

    it(`contains it's route and model`, () => {
        expect(mail).toMatchObject(
            expect.objectContaining({
                Router: expect.any(Object),
                Model: expect.any(Object),
            })
        );
    });

    it('has a function to generate email object', () => {
        expect(mail.generateEmail).not.toBeUndefined();
    });

    describe('.generateEmail', () => {
        it('given a proper email object, returns api complaint email object', () => {
            const properEmail = {
                to: ['recipient@email.com'],
                from: 'sender@email.com',
                replyTo: 'noreply@email.com',
                subject: 'sub',
                text: 'not blank',
                html: '<p>still not blank</p>',
                cc: null,
            };
            const { generateEmail } = mail;
            expect(generateEmail(properEmail)).toMatchObject(expect.objectContaining(properEmail));
        });

        it('returns on object with an `errors` property when given invalid params', () => {
            const improperEmail = {
                to: ['email.com'],
                from: 'sender@email.com',
                replyTo: 'noreply@email.com',
                subject: 'sub',
                text: 'not blank',
                html: 'p>still not blank</p>',
                cc: null,
            };
            const { generateEmail } = mail;
            expect(generateEmail(improperEmail)).toMatchObject(
                expect.objectContaining({
                    errors: expect.any(Object),
                })
            );
        });
    });
});
