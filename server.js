'user strict';

var express = require('express');
var routes = require('./app/routes/index.js');
var passport = require('passport');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var flash = require('connect-flash');

var app = express();
//require('dotenv').load();
require('./app/config/passport.js')(passport);

var url = 'mongodb://admin:admin@ds145649.mlab.com:45649/poll-a-lot';

mongoose.connect(url);

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
  secret: '53cr33t',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log('App listening on port ' + port);
});
