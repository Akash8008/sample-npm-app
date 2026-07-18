const express = require('express');
const usersRouter = require('./routes/users');

// This is the main Express app.
// We mount the user routes here so the new MongoDB APIs are available.
const app = express();

const PORT = process.env.PORT || 3000;

// Parse JSON request bodies for POST /users.
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to DevOps CI/CD Demo');
});

app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

app.get('/version', (req, res) => {
  res.json({ version: '1.0.0' });
});

// Mount the user API routes.
app.use('/users', usersRouter);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
