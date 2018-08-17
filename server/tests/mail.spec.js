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
});
