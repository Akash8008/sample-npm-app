const request = require('supertest');
const app = require('./index');

describe('DevOps CI/CD Demo API', () => {
  test('GET / returns welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Welcome to DevOps CI/CD Demo');
  });

  test('GET /health returns status UP', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ status: 'UP' });
  });

  test('GET /version returns version 1.0.0', async () => {
    const response = await request(app).get('/version');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ version: '1.0.0' });
  });
});
