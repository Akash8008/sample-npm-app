const express = require('express');
const healthRouter = require('./routes/health');
const versionRouter = require('./routes/version');

const app = express();

app.get('/', (_req, res) => {
  res.send('Welcome to DevOps CI/CD Demo');
});

app.use('/health', healthRouter);
app.use('/version', versionRouter);

module.exports = app;
