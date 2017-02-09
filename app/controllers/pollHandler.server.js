'use strict';

var Polls = require('../models/polls.js');
var Users = require('../models/users.js');

function pollHandler () {

  this.createPoll = function (req, res) {
    var name = req.body.name;
    var labels = req.body.labels;
    var values = [];
    labels.forEach(function(element){
      values.push(0);
    });

    var newPoll = new Polls({
      name: name,
      labels: labels,
      values: values
    });

    newPoll.save(function (err, doc) {
      if (err) {throw err;}

      console.log(doc);
    });

    res.redirect('/yourpolls');
  };

  this.getPolls = function (req, res) {

    Polls.find({})
    .exec(function (err, result) {
      if (err) {throw err;}

      if (result) {
        res.json(result);
      }
    });
  }


  this.getSinglePoll = function (req, res) {
    var name = req.params.pollname;
    var regexp = new RegExp(name, "gi");

    Polls.findOne({name: regexp})
    .exec(function(err, result) {
      if (err) {throw err;}

      else if (result) {
        res.json(result);
      } else {
        console.log('single poll not found');
      }
    });
  }

  this.pollGraph = function (req, res, next) {
    console.log(req.params);
  }

  this.vote = function (req, res) {
    console.log(req.body);
    var name = req.body.name;
    var regexp = new RegExp(name, "gi");

    var id = req.body.id;
    var vote = req.body.vote;


    Polls.findOne({name: regexp}, function (err, result) {
      if (err) {throw err;}

      if (result) {

        var voteIndex = result.labels.indexOf(vote);
        var newValues = result.values;
        newValues[voteIndex] = parseInt(newValues[voteIndex]) + 1;

        Polls.update({name: regexp}, {$set: {values: newValues}}, function(err, updated) {
          if (err) {throw err;}

        });

      }

      else {
        console.log('not found');
      }
    })

    res.redirect('/poll/' + name);
  }

};

module.exports = pollHandler;
