const request = require('supertest');
const app = require('../src/app');

describe('Sample Node App', () => {
  test('GET / returns welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Welcome to DevOps CI/CD Demo');
  });
});
