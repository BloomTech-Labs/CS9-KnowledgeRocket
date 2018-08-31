const { getAllCohorts, getAll, whereCohortRocket, getTodayAndTomorrow } = require('./MailModel');

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

    describe('.whereCohortRocket', () => {
        it('creates an object of the correct shape', () => {
            const opts = {
                interval: 'td',
                start: 1,
                end: 2,
            };
            const createdOject = whereCohortRocket(opts.interval, opts.start, opts.end);
            expect(createdOject).toMatchObject(
                expect.objectContaining({
                    rockets: {
                        $elemMatch: {
                            [opts.interval]: {
                                $gte: opts.start,
                                $lt: opts.end,
                            },
                        },
                    },
                })
            );
        });
    });

    describe('.getTodayAndTomorrow', () => {
        it('returns an object with today and tomorrow properties', () => {
            const toanto = getTodayAndTomorrow();
            expect(toanto).toMatchObject(
                expect.objectContaining({
                    today: expect.any(Date),
                    tomorrow: expect.any(Date),
                })
            );
        });
    });
});
