'use strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var passport = require('passport');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var flash = require('connect-flash');



var app = express();

//set view engine
app.set('view engine', 'ejs');
//load dotenv module
require('dotenv').load();
require('./app/config/passport.js')(passport);

var url = process.env.MONGOLAB_URI;

mongoose.connect(url);

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: '53cr33t',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log('App listening on port ' + port);
});
