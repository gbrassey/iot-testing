'use strict';

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var httpRoute = require('./routes/httpRoute');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('./config')[process.env.NODE_ENV];
if (config.seedDB) {
	require('./config/seed');
}

var app = express();
mongoose.connect(config.mongodb);
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

if (process.env.NODE_ENV !== 'test') app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
if (process.env.NODE_ENV === 'development') {
	app.use('/bower_components',  express.static(path.join(__dirname + '/bower_components')));
	app.use('/src/javascripts', express.static(path.join(__dirname + '/src/javascripts')));
}

app.use('/', routes);
app.use('/http', httpRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: (process.env.NODE_ENV === 'development') ? err : {}
    });
});


module.exports = app;
