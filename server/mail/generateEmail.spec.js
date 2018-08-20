const { validate } = require('./generateEmail');

describe('testing generateEmail internals', () => {
    describe('validation', () => {
        it('calls validator with validatee', () => {
            const validator = jest.fn();
            const validatee = {};
            validate(validatee, validator);
            expect(validator.mock.calls.length).toBe(1);
        });
    });
});
