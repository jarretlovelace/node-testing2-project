const express = require('express');
const db = require('./db-config');

const app = express();
app.use(express.json());

app.get('/users', async (req, res) => {
  const users = await db('users').select();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const [id] = await db('users').insert(req.body);
  const newUser = await db('users').where({ id }).first();
  res.status(201).json(newUser);
});

app.put('/users/:id', async (req, res) => {
  await db('users').where({ id: req.params.id }).update(req.body);
  const updatedUser = await db('users').where({ id: req.params.id }).first();
  res.json(updatedUser);
});

app.delete('/users/:id', async (req, res) => {
  await db('users').where({ id: req.params.id }).del();
  res.status(204).end();
});

module.exports = app;
