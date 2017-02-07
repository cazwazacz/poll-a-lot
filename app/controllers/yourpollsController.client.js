'use strict';

(function () {

  angular
     .module('yourpolls', ['ngResource'])
     .controller('listPolls', ['$scope', '$resource', function ($scope, $resource) {


        var Polls = $resource('/api/data');

        $scope.names = [];

        $scope.getPolls = function () {
          Polls.query(function (results) {
            for (let i=0; i<results.length; i++) {
              $scope.names.push(results[i].name);
            }
          });
        };

        $scope.getPolls();
     }]);

})();
