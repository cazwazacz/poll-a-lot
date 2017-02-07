'use strict';

function pollHandler (db) {

  var polls = db.collection('polls');

  this.createPoll = function (req, res) {
    var name = req.body.name;
    var labels = req.body.labels;
    var values = [];
    labels.forEach(function(element){
      values.push(0);
    });
    polls.insert({name: name, labels: labels, values: values});
    //res.redirect('/poll');
  };

  this.getPolls = function (req, res) {
    var cursor = polls.find({});
    cursor.toArray(function(err, found){
    if (err) {throw err;}
    res.json(found);
    });

  }

  this.getSinglePoll = function (req, res) {
    var name = req.params.pollname;
    polls.findOne({name: name}, function (err, result){
      if (err) {throw err;}
      else if (result) {
        res.json(result);
      } else {
        console.log ('Not found');
      }
    });
  }

  this.vote = function (req, res) {

    var name = req.body.name;
    var id = req.body.id;
    var vote = req.body.vote;

    polls.findOne({name: name}, function (err, result) {
      if (err) {throw err;}

      if (result) {
        var voteIndex = result.labels.indexOf(vote);
        var newValues = result.values;
        newValues[voteIndex] = parseInt(newValues[voteIndex]) + 1;

        polls.update({name: name},
          {$set:
            {values: newValues}
          }
        )
      }

      else {
        console.log('not found');
      }
    })

    res.redirect('/' + name);
  }


  var clicks = db.collection('clicks');
  this.getClicks = function (req, res) {
    var clickProjection = {_id: false};
    clicks.findOne({}, clickProjection, function (err, result){
      if (err){
        throw err;
      }
      if (result){
        res.json(result);
      } else {
        clicks.insert({'clicks': 0}, function (err){
          if (err) {
            throw err;
          }
          clicks.findOne({}, clickProjection, function (err, doc){
            if (err) {
              throw err;
            }
            res.json(doc);
          });
        });
      }

    });
  };

  this.addClick = function (req, res) {
    clicks.findAndModify(
      {},
      {'_id': 1},
      { $inc: {clicks: 1}},
      function (err, result) {
        if (err) {throw err;}

        res.json(result);
      }
    );
  };

  this.resetClicks = function (req, res) {
    clicks.update(
      {},
      {'clicks': 0}, function (err, result) {
        if (err) {throw err;}

        res.json(result);
      }
    );
  };
};

module.exports = pollHandler;
