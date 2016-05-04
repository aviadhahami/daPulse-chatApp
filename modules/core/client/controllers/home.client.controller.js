'use strict';

angular.module('core').controller('HomeController', ['$scope','$http','$interval',
  function ($scope,$http,$interval) {
    var rand = function() {
      return Math.random().toString(36).substr(2); // remove `0.`
    };

    var token = function() {
      return rand(); // to make it longer
    };

    var generateId = function(){
      return token();
    };
    var id =generateId();

    $scope.messages= [];

    $scope.sendMessage = function(){
      var data = {
        message : $scope.messageInput || '',
        user : id
      };
      $http.post('/api/postMessage',data).then(function(res){
        console.log(res);
        getMessages();
        $scope.messageInput = '';
      }, function(err){
        console.log(err)
      });
    };

    var refreshed = Date.now();
    var getMessages = function(){
      console.log('getting');
      var data = {
        time:refreshed
      };
      $http.post('/api/getNewMessages',data).then(function(res){
        // console.log(res)
        $scope.messages= $scope.messages.concat(res.data);
        refreshed = new Date();
        // console.log(res.data);
      },function(err){
        console.log(err);
      });
    };
    $interval(getMessages,1500);

  }
]);
