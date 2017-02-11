'use strict';

(function () {

  angular
     .module('yourpolls', ['ngResource'])
     .controller('listPolls', ['$scope', '$resource', '$sce', function ($scope, $resource, $sce) {


        var User = $resource('/api/currentuser');

        $scope.delete = function(argument) {
          argument = argument.replace('?', ' ');

          var postUrl = '/api/' + argument + '/delete';
          var deleteApi = $resource(postUrl);
          deleteApi.save(function () {

          });

        };

        $scope.names = [];

        $scope.getPolls = function () {
          User.get(function (user) {

            $scope.user = user.username;

            var Polls = $resource('/api/' + $scope.user + '/polls/');

            Polls.query(function (results) {
              for (let i=0; i<results.length; i++) {
                $scope.names.push(results[i].name);
              }
            });

          });
        };

        $scope.getPolls();

        //var Polls = $resource('/api/data');



        /*$scope.getPolls = function () {
          User.get(function (user) {
            console.log(user);
            Polls.query(function (results) {
              for (let i=0; i<results.length; i++) {
                $scope.names.push(results[i].name);
              }
            });
          })
        };

        $scope.getPolls();*/


     }]);

})();
