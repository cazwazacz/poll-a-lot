'use strict';

(function () {

  var pathname = window.location.pathname;
  pathname = pathname.split('/');
  pathname = '/' + pathname[pathname.length - 1];

  var url = '/api/poll' + pathname;


  $(document).ready(function() {

    $.getJSON(url, function(data) {

      var title = data.name;
      var id = data._id;

      $('#title').html(title);

      $('#form').append('<input type="hidden" name="id" value="' + id + '">');
      $('#form').append('<input type="hidden" name="name" value="' + title + '">');

      for (let i = 0;  i < data.labels.length; i++) {
        var label = data.labels[i];
        $('#form').append('<input type="radio" name="vote" value="' + label + '">' + label + '<br>');
      }

      //$('#form').append('<input type="radio" name="gender" value="male"> Male<br>');
      //$('#form').append('<input type="radio" name="gender" value="Female"> Female<br>');
      $('#form').append('<input type="submit" value="Submit">');

    });

  });

  /*angular
     .module('vote', ['ngResource'])
     .controller('listPolls', ['$scope', '$resource', function ($scope, $resource) {


        var Poll = $resource('/api/poll' + pathname);

        $scope.getPoll = function () {
          Poll.get(function (result) {
            $scope.labels = result.labels;
          });
        };

        $scope.getPoll();
     }]);*/

})();
