'use strict';

var PollHandler = require(process.cwd() + '/app/controllers/pollHandler.server.js');

module.exports = function (app, db){

  var pollHandler = new PollHandler(db);

  app.route('/')
     .get(function(req, res){
        res.sendFile(process.cwd() + '/public/home.html');
        //res.sendFile(process.cwd() + '/public/yourpolls.html');
     });
  /*
  app.route('/api/clicks')
      .get(clickHandler.getClicks)
      .post(clickHandler.addClick)
      .delete(clickHandler.resetClicks);*/

  app.route('/api/data')
      .post(pollHandler.createPoll)
      .get(pollHandler.getPolls);

  app.route('/poll')
    .get(function(req, res){
      res.sendFile(process.cwd() + '/public/poll.html');
    });

  app.route('/yourpolls')
    .get(function (req, res) {
      res.sendFile(process.cwd() + '/public/yourpolls.html');
    });

  app.route('/api/poll/:pollname')
    .get(pollHandler.getSinglePoll)
    .post(pollHandler.vote);

  app.route('/:pollname')
    .get(function (req, res) {
      res.sendFile(process.cwd() + '/public/poll.html');
    });

  app.route('/vote/:pollname')
    .get(function (req, res) {
      res.sendFile(process.cwd() + '/public/vote.html');
    });
};
