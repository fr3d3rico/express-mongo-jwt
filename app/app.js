const express = require('express');
const jwt = require('jsonwebtoken');

const toolsRouter = require('./routes/toolsRouter');

const app = express();

app.use(toolsRouter);

module.exports = app;