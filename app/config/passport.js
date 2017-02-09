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
    process.nextTick(function() {
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
    });
    }
  ));

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
    function(req, username, password, done) {
        process.nextTick(function() {
        User.findOne({username : username}, function(err, user) {
            if (err)
                return done(err);
            if (user) {
                return done(null, false, { message: 'That username is already taken.' });
            } else {
                var newUser = new User();
                newUser.username = username;
                newUser.password = password;

                newUser.save(function(err) {
                    if (err) {throw err;}
                    return done(null, newUser);
                });
            }
        });
        });
    }));

};
