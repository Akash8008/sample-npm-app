const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Welcome to DevOps CI/CD Demo');
});

app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

app.get('/version', (req, res) => {
  res.json({ version: '1.0.0' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
