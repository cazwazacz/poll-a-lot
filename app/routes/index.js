'use strict';

var PollHandler = require(process.cwd() + '/app/controllers/pollHandler.server.js');

module.exports = function (app, passport){

  function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login');
    }
  }

  var pollHandler = new PollHandler();

  app.route('/')
     .get(isLoggedIn, function(req, res){
        res.sendFile(process.cwd() + '/public/homeloggedin.html');
     });

  /*app.post('/login',
    passport.authenticate('local', { successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true })
  );*/

  app.route('/logout')
    .get(function(req, res) {
      req.logout();
      res.redirect('/');
    });


  app.route('/api/data')
      .post(pollHandler.createPoll)
      .get(pollHandler.getPolls);

  app.route('/poll')
    .get(function(req, res){
      res.sendFile(process.cwd() + '/public/poll.html');
    });

  app.route('/yourpolls')
    .get(function (req, res) {
      res.sendFile(process.cwd() + '/public/yourpolls2.html');
    });

  app.route('/signup')
    .get(function (req, res) {
      res.sendFile(process.cwd() + '/public/signup.html');
    });

  app.route('/login')
    .get(function (req, res) {
      res.sendFile(process.cwd() + '/public/login.html');
    })
    .post(passport.authenticate('local', { successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true }));


  app.route('/api/poll/:pollname')
    .get(pollHandler.getSinglePoll)
    .post(pollHandler.vote);

  app.route('/poll/:pollname')
    .get(function (req, res) {
      res.sendFile(process.cwd() + '/public/poll2.html');
    });

  app.route('/vote/:pollname')
    .get(function (req, res) {
      res.sendFile(process.cwd() + '/public/vote2.html');
    });

};
