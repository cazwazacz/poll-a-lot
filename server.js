'user strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongo = require('mongodb').MongoClient;

var app = express();

mongo.connect('mongodb://localhost:27017/pollingapp', function(err, db){
  if (err){
    throw new Error('Database failed to connect!');
  } else {
    console.log('MongoDB successfully connected on port 27017.')
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
