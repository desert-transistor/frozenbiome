angular.module('waffle.post', [])

// .controller('PostController', function($scope, $rootScope, $routeParams, Dashboard, $location) {
.controller('PostController', function ($scope, $rootScope, Edit, Dashboard, $location, Auth) {

  $scope.submitComment = function(content, created) {
    console.log(content);
    console.log(this.created);
    console.log(3);
  }

})

