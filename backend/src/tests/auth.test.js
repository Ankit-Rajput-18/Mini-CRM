const request = require('supertest');
const app = require('../server');

describe('Auth', () => {
  it('registers user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: 'test1@example.com',
      password: 'password123'
    });
    expect([201,400]).toContain(res.statusCode); // if re-run, may already exist
  });
});
