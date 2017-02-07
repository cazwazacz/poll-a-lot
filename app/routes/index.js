'use strict';

var PollHandler = require(process.cwd() + '/app/controllers/pollHandler.server.js');

module.exports = function (app, db){

  var pollHandler = new PollHandler(db);

  app.route('/')
     .get(function(req, res){
        res.sendFile(process.cwd() + '/public/homeloggedin.html');
        //res.sendFile(process.cwd() + '/public/yourpolls.html');
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
    });

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
