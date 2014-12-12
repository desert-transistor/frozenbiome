angular.module('waffle.services', [])


.factory('Edit', function ($http, $location, $window, $rootScope) {
  //getPost() if post exists, else if new post, don't

  var imageId = [];

  //PASS IN USERID
  var addPost = function (title, content, user, imageId, userId) {
    return $http({
      method: 'POST',
      url: '/api/blogposts/?userId=' + userId,
      data: { title: title, content: content, username: user, imageUrl: imageId }
    });
  }
  
  //PASS IN USERID
  var updatePost = function (title, content, postID, userId) {
    return $http({
      method: 'POST',
      url: '/api/blogposts/' + postID + '?userId=' + userId,
      data: { title: title, content: content, username: $rootScope.user, postID: postID }
    });
  }

  return {
    imageId: imageId,
    addPost: addPost,
    updatePost: updatePost
  };

})

.factory('Dashboard', function ($http, $location, $window) {
  

  //PASS IN USERID
  var getAllPosts = function (userId) {
    return $http({
      method: 'GET',
      //TODO: Dynamically update username, and display at top of dashboard page
      url: 'api/blogposts/?userId=' + userId,
    })
    .then(function(res) {
      return res.data;
    })
  }

  //none yet in the new server
  var deletePost = function (postID, userId) {
    return $http({
      method: 'DELETE',
      url: '/api/blogposts/'+ postID +'?userId=' + userId ///some postId
    })
  }

  //PASS IN USERID AND APPEND USERID
  var loadUserBlog = function(userId) {
    //needs user id in place of user name.

    return $http({
      method: 'GET',
      url: 'api/users/' + userId,
    })
    .then(function(res) {
      return res.data;
    })
  }

  //DONE
  var getAllWafflers = function() {
    return $http({
      method: 'GET',
      url: '/api/users/'
    })
    .then(function(res) {
      return res.data;
    })
  }

  return {
    getAllPosts: getAllPosts,
    deletePost: deletePost,
    loadUserBlog: loadUserBlog,
    getAllWafflers: getAllWafflers
  };
})

//NOTHING DONE YET
.factory('Auth', function ($http, $location, $window) {
  var login = function (username, password) {
    return $http({
      method: 'POST',
      url: '/auth/login',
      data: {username: username}
    })
  }
  
  //DONE
  var signup = function (username, password) {
    return $http({
      method: 'POST',
      url: '/api/users/',
      data: {username: username, password: password}
    })
  }

  //NOTHING DONE YET
  var logout = function() {
    return $http({
      method: 'GET',
      url: '/logout'
    })
  }

  //NOTHING DONE YET
  var checkSession = function() {
    return $http({
      method: 'GET',
      url: '/checkSession'
    })
  }

  var loggedIn = false;

  var user = '';

  var currentUser = '';

  var saveUser = function(name){
    this.currentUser = name;
  }

  return {
  	login: login,
    signup: signup,
    logout: logout,
    loggedIn: loggedIn,
    user: user,
    currentUser: currentUser,
    saveUser: saveUser,
    checkSession: checkSession
  };
})
