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
    .get(function (req, res) {
       if (req.isAuthenticated()){
        res.render('index', {user: req.user.username});
      } else {
        res.sendFile(process.cwd() + '/public/index.html');
      }
    });

  app.route('/logout')
    .get(function(req, res) {
      req.logout();
      res.redirect('/');
    });


  app.route('/api/data')
      .post(pollHandler.createPoll)
      .get(pollHandler.getPolls);

  app.route('/yourpolls')
    .get(function (req, res) {
      if (req.isAuthenticated()) {
        res.sendFile(process.cwd() + '/public/yourpolls2.html');
      } else {
        res.redirect('/login');
      }
    });

  app.route('/signup')
    .get(function (req, res) {
      res.render('signup', {message: req.flash('error')});
    })
    .post(passport.authenticate('local-signup', { successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true }));

  app.route('/login')
    .get(function (req, res) {
      //console.log(req.flash('error')[0]);
      //res.sendFile(process.cwd() + '/public/login.html');
      res.render('login', {message: req.flash('error')});
    })
    .post(passport.authenticate('local', { successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true }));


  app.route('/api/poll/:pollname')
    .get(pollHandler.getSinglePoll)
    .post(pollHandler.vote);

  app.route('/api/currentuser/')
    .get(pollHandler.currentUser);

  app.route('/api/:user/polls')
    .get(pollHandler.currentUserPolls);  

  app.route('/poll/:pollname')
    .get(function (req, res) {
      if (req.isAuthenticated()) {
        res.sendFile(process.cwd() + '/public/poll2loggedin.html');
      } else {
      res.sendFile(process.cwd() + '/public/poll2.html');
      }

    });

  app.route('/vote/:pollname')
    .get(function (req, res) {
      if (req.isAuthenticated()) {
        res.sendFile(process.cwd() + '/public/vote3loggedin.html');
      } else {
      res.sendFile(process.cwd() + '/public/vote3.html');
      }
    });

};
