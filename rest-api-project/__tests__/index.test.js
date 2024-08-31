const request = require('supertest');
const app = require('../index');
const db = require('../db-config');

beforeAll(async () => {
  await db.migrate.latest();
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe('Users API', () => {
  it('GET /users - should return all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  it('POST /users - should create a new user', async () => {
    const res = await request(app).post('/users').send({ name: 'Alice', email: 'alice@example.com' });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Alice');
  });

  // Add more tests...
});
