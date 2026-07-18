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

  test('POST /users rejects incomplete data', async () => {
    const response = await request(app).post('/users').send({ name: 'Ada' });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  test('GET /users returns a response when the database is not configured', async () => {
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(503);
    expect(response.body).toHaveProperty('error');
  });
});
