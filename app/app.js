const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const cors = require('cors');
const helmet = require('helmet');

const toolsRouter = require('./routes/toolsRouter');

const app = express();

app.use(helmet());
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(toolsRouter);

module.exports = app;