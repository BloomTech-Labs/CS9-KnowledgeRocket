const { getAllCohorts, getAll } = require('./MailModel');

describe('MailModel', () => {
    it('has a getAllCohorts fn', () => {
        expect(getAllCohorts).toBeTruthy();
    });

    describe('.getAll', () => {
        const mockModel = {
            find: jest.fn(),
        };
        const mockExec = jest.fn(
            () =>
                new Promise(resolve => {
                    resolve(true);
                })
        );
        const mockPopulate = jest.fn();

        mockModel.find.mockReturnValue({
            populate: mockPopulate,
            exec: mockExec,
        });
        afterEach(() => {
            mockModel.find.mockClear();
            mockExec.mockClear();
            mockPopulate.mockClear();
        });
        it('given a model, calls find on it', async () => {
            const getAllMock = getAll(mockModel);
            await getAllMock();
            expect(mockModel.find.mock.calls.length).toBeGreaterThan(0);
        });

        it('given fields to populate, calls populate for each one', async () => {
            const fields = ['ti', 'to', 'tu'];
            const getAllMock = getAll(mockModel, ...fields);
            await getAllMock();
            expect(mockPopulate.mock.calls.length).toBe(fields.length);
        });
    });
});
