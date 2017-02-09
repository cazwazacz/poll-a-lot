'use strict';

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users.js');

module.exports = function (passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err);
        console.log('error'); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
          console.log('incorrect username');
        }
        if (user.password != password) {
          return done(null, false, { message: 'Invalid password' });
        }
        return done(null, user);
        console.log('loggedin');
      });
    }
  ));

};
