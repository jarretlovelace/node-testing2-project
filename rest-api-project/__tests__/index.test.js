const request = require('supertest');
const app = require('../index');
const db = require('../db-config');

// Run migrations and seed the database before all tests
beforeAll(async () => {
  await db.migrate.latest();
  await db.seed.run();
});

// Rollback migrations and close the database connection after all tests
afterAll(async () => {
  await db.migrate.rollback();
  await db.destroy();
});

describe('Users API', () => {
  // Test to get all users
  it('GET /users - should return all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0); // Ensure there's at least 1 user
  });

  // Test to get a user by ID
  it('GET /users/:id - should return a specific user by ID', async () => {
    const res = await request(app).get('/users/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
    expect(res.body).toHaveProperty('name'); // Ensuring 'name' is present
  });

  // Test to create a new user
  it('POST /users - should create a new user', async () => {
    const newUser = { name: 'Alice', email: 'alice@example.com' };
    const res = await request(app).post('/users').send(newUser);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name', 'Alice');
    expect(res.body).toHaveProperty('email', 'alice@example.com');
  });

  // Test to update an existing user
  it('PUT /users/:id - should update a user', async () => {
    const updatedUser = { name: 'Updated John', email: 'updated.john@example.com' };
    const res = await request(app).put('/users/1').send(updatedUser);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', 'Updated John');
    expect(res.body).toHaveProperty('email', 'updated.john@example.com');
  });

  // Test to delete a user
  it('DELETE /users/:id - should delete a user', async () => {
    const res = await request(app).delete('/users/1');
    expect(res.statusCode).toBe(204);

    // Verify the user is deleted
    const check = await request(app).get('/users/1');
    expect(check.statusCode).toBe(404);
  });

  // Test for edge cases
  // 1. GET non-existent user
  it('GET /users/:id - should return 404 for non-existent user', async () => {
    const res = await request(app).get('/users/999'); // Assuming 999 doesn't exist
    expect(res.statusCode).toBe(404);
  });

  // 2. POST user with missing fields
  it('POST /users - should return 400 for missing fields', async () => {
    const res = await request(app).post('/users').send({ name: 'Missing Email' });
    expect(res.statusCode).toBe(400); // Assuming your endpoint returns 400 for missing fields
  });

  // 3. PUT non-existent user
  it('PUT /users/:id - should return 404 when trying to update non-existent user', async () => {
    const res = await request(app).put('/users/999').send({ name: 'Non-existent' });
    expect(res.statusCode).toBe(404);
  });

  // 4. DELETE non-existent user
  it('DELETE /users/:id - should return 404 when trying to delete non-existent user', async () => {
    const res = await request(app).delete('/users/999');
    expect(res.statusCode).toBe(404);
  });
});
