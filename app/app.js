const express = require('express');
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('./routes/authRouter');
const toolsRouter = require('./routes/toolsRouter');

const app = express();

app.use(helmet());
app.use(cors());
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(authRouter);
app.use(toolsRouter);

module.exports = app;