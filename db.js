const mongoose = require('mongoose');

// This module handles the MongoDB connection.
// The connection string is read from the MONGO_URI environment variable.
// Docker Compose can provide that value for us.

async function connectToDatabase() {
  // Reuse the existing connection if it is already open.
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // If Mongoose is already trying to connect, wait for it to finish.
  if (mongoose.connection.readyState === 2) {
    await new Promise((resolve, reject) => {
      mongoose.connection.once('open', resolve);
      mongoose.connection.once('error', reject);
    });
    return mongoose.connection;
  }

  // Do not hardcode a database URL. Read it from the environment.
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined.');
  }

  await mongoose.connect(process.env.MONGO_URI);
  return mongoose.connection;
}

async function ensureDatabaseConnection() {
  return connectToDatabase();
}

module.exports = {
  connectToDatabase,
  ensureDatabaseConnection,
};
