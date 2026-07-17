const request = require('supertest');
const app = require('../src/app');

describe('Version endpoint', () => {
  test('GET /version returns version 1.0.0', async () => {
    const response = await request(app).get('/version');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ version: '1.0.0' });
  });
});
