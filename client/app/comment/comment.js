angular.module('waffle.comment', [])

// .controller('PostController', function($scope, $rootScope, $routeParams, Dashboard, $location) {
.controller('CommentController', function ($scope, $rootScope, Edit, Dashboard, $location, Auth) {
  $scope.commentArray = [];

  $scope.submitComment = function(content, created) {
    console.log(content);
    console.log(this.created);
    var time = new Date();
    var newComment = {};
    newComment.commenter = $rootScope.user;
    newComment.date = time;
    newComment.text = content;
    $scope.commentArray.push(newComment);
    // $scope.commenter = $rootScope.user;
    // $scope.date = created;
    // $scope.text = content;
    // var col8 = document.getElementsByClassName("col-lg-8")[0];
    // var commentEl = angular.element('<div class="media"><a class="pull-left" href="#"><img class="media-object" src="http://placehold.it/64x64" alt=""></a><div class="media-body"><h4 class="media-heading">' + $rootScope.user + '<small>' + created + '</small></h4>' + content + '</div></div>');
    // console.log(col8);
    // col8.appendChild(commentEl);
    console.log($scope.commentArray);
  }

})

