'user strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var path = require('path');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var session = require('express-session');
var mongo = require('mongodb').MongoClient;

var app = express();

var url = process.env.MONGOLAB_URI;

mongo.connect(url, function(err, db){
  if (err){
    throw new Error('Database failed to connect!');
  } else {
    console.log('MongoDB successfully connected to VotingApp on mLab.')
  }

  app.use('/public', express.static(process.cwd() + '/public'));
  app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(session({
    secret: '53cr33t',
    resave: false,
    saveUninitialized: true
  }));

  routes(app, db);

  var port = process.env.PORT || 3000;

  app.listen(port, function(){
    console.log('App listening on port ' + port);
  });

});
