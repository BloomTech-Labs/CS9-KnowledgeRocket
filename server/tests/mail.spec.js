const mail = require('../mail');

describe('testing mail route and capabilities', () => {
    it('exists', () => {
        expect(mail).not.toBeUndefined();
    });

    it(`contains its route and model`, () => {
        expect(mail).toMatchObject(
            expect.objectContaining({
                Router: expect.any(Function),
                Model: expect.any(Object),
                generateEmail: expect.any(Function),
            })
        );
    });

    it('has a function to generate email object', () => {
        expect(mail.generateEmail).not.toBeUndefined();
    });

    describe('.generateEmail', () => {
        it('given a proper email object, returns api complaint email object', async () => {
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
            expect(await generateEmail(properEmail)).toMatchObject(
                expect.objectContaining(properEmail)
            );
        });

        it('returns on object with an `errors` property when given invalid params', async () => {
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
            const result = await generateEmail(improperEmail);

            expect(result).toMatchObject(
                expect.objectContaining({
                    errors: expect.any(Object),
                })
            );
        });
    });
});
