const express = require('express');
const User = require('../models/User');
const { ensureDatabaseConnection } = require('../db');

const router = express.Router();

// This middleware makes sure the request body is parsed as JSON.
router.use(express.json());

// Create a new user.
router.post('/', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required.' });
  }

  try {
    await ensureDatabaseConnection();
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(503).json({ error: 'Unable to connect to MongoDB.', details: error.message });
  }
});

// Get all users.
router.get('/', async (_req, res) => {
  try {
    await ensureDatabaseConnection();
    const users = await User.find({}).sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(503).json({ error: 'Unable to connect to MongoDB.', details: error.message });
  }
});

module.exports = router;
