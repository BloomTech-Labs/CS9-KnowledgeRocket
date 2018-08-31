const { validate, Validator } = require('./generateEmail');

describe('testing generateEmail internals', () => {
    describe('validate', () => {
        const properEmail = {
            to: ['recipient@email.com'],
            from: 'sender@email.com',
            replyTo: 'noreply@email.com',
            subject: 'sub',
            text: 'not blank',
            html: '<p>still not blank</p>',
            cc: null,
        };
        describe('Validator', () => {
            it('calls validator with validatee', () => {
                const validator = jest.fn();
                const validatee = {};
                validate(validatee, validator);
                expect(validator.mock.calls.length).toBe(1);
            });

            it('returns an object shaped {isValid, errors}', async () => {
                expect(await Validator(properEmail)).toMatchObject(
                    expect.objectContaining({
                        isValid: expect.any(Boolean),
                        errors: expect.any(Object),
                    })
                );
            });
        });
    });
});
