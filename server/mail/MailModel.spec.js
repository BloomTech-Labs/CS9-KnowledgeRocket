const { getAllCohorts } = require('./MailModel');
describe('MailModel', () => {
    it('has a getAllCohorts fn', () => {
        expect(getAllCohorts).toBeTruthy();
    });

    it('returns data', async () => {
        expect(await getAllCohorts()).toBeTruthy();
    });
});
