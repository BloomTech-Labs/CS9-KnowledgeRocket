const request = require('supertest');

const server = require('../server');

describe('server', () => {
    test('should return 200 and a response', async (done) => {
        const expected ={ api: 'running' };
        const response = await request(server).get('/');
        expect(response.status).toBe(200);
        expect(response.type).toBe('application/json');
        expect(response.body).toEqual(expected);
        done();
    });
});