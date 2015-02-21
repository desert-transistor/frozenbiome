angular.module('waffle.comment', [])


.controller('CommentController', function ($scope, $rootScope, Edit, Dashboard, $location, Auth) {
  $scope.commentArray = [];

  $scope.submitComment = function(content, created) {
    var time = new Date();
    var newComment = {};
    newComment.commenter = $rootScope.user;
    newComment.date = time;
    newComment.text = content;
    $scope.commentArray.push(newComment);
    // after comment has been submitted, the input field for comments is cleared
    $scope.commentContent = '';
  }

})

