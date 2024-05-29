require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var animalRouter = require('./routes/animals');
const refreshToken = require('./controllers/RefreshToken');

var app = express();

app.use(cors({credentials:true, origin:'http://localhost:5000'}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/token', refreshToken);
app.use('/users', usersRouter);
app.use('/animals', animalRouter);

module.exports = app;
