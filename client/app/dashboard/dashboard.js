angular.module('waffle.dashboard', ['masonry','ui.directives'])

.directive('packery', ['$rootScope', '$timeout',
  function($rootScope, $timeout) {
    return {
      restrict: 'A',
      scope: true,
      link: function(scope, element, attrs) {
        console.log("link called on", element[0]);
        scope.element = element;
        if (!$rootScope.packery) {
          $rootScope.packery = new Packery(element[0].parentElement, {
            columnWidth: '.thumb',
            itemSelector: '.thumb',
            gutter: 10,
          });

          var draggable1 = new Draggabilly(element[0]);
          $rootScope.packery.bindDraggabillyEvents(draggable1);

          var orderItems = function() {
            var itemElems = $rootScope.packery.getItemElements();
            $(itemElems).each(function(i, itemElem) {
              $(itemElem);
            });
          };

          $rootScope.packery.on('layoutComplete', orderItems);
          $rootScope.packery.on('dragItemPositioned', orderItems);


        } else {
          // console.log("else", element[0]);
          $timeout(function() {
            $rootScope.packery.appended(element[0])
          });
          var draggable2 = new Draggabilly(element[0]);
          $rootScope.packery.bindDraggabillyEvents(draggable2);


        }
        $timeout(function() {
          $rootScope.packery.layout();
        });


        // watch for destroying an item
        scope.$on('$destroy', function() {
          $rootScope.packery.remove(scope.element[0]);
          scope.packery.layout();
        });


      }
    };

  }
])

.controller('DashboardController', function($scope, $rootScope, Dashboard, $timeout, $location, Auth, $stateParams) {
  $scope.posts = [];
  //For tracking which posts are already rendered
  $scope.post_ids = [];
  $rootScope.wafflers = [];
  $rootScope.waffler_ids = [];

  $scope.getRandomColSize = function() {
    arr = ['col-md-2','col-md-4'];
    var pos = Math.floor((Math.random() * arr.length));
    return arr[pos];
  }

  $scope.getRandomLength = function() {
    return Math.floor((Math.random() * 1000));

  }

  $scope.getRandomName = function() {
    arr = ['Alex Hawkins', 'Evan Spiler', 'David Kae', 'Grant Wu'];
    var pos = Math.floor((Math.random() * 4));
    return arr[pos];
  }

  $scope.getAllPosts = function() {
    console.log("GETTING POSTS")
    Dashboard.getAllPosts()
      .then(function(data) {
        data.posts.forEach(function(post) {
          console.log(post)
          if ($scope.post_ids.indexOf(post._id) == -1) {
            $scope.posts.push(post);
            $scope.post_ids.push(post._id);
          }
        }, function(err) {
          console.log("Couldn't retrieve posts: ", err);
        });

      });
  }

  $scope.makePost = function() {
    $rootScope.title = '';
    $rootScope.content = '';
    $rootScope.postID = '';
    $rootScope.isUpdate = false;
    $location.path('/edit');
  }

  $scope.deletePost = function() {
    if (confirm('Are sure you want to delete this post?')) {
        console.log("**************  DELETE POST: ", this.post._id)
        Dashboard.deletePost(this.post._id)
        .then(function(data) {
          location.reload();
        })
    } else {
        // Do nothing!
    }
  }

  $scope.savePostInfo = function() {
    console.log(this.post._id);
    $rootScope.title = this.post.title;
    $rootScope.content = this.post.content;
    $rootScope.markedContent = this.post.markedContent;
    $rootScope.postID = this.post._id;
    $rootScope.isUpdate = true;
    $rootScope.created = this.post.created;
    $rootScope.postAuthor = this.post.author;
    $rootScope.postUsername = this.post.username;
  }

  $scope.testFunc = function() {
    return true;
  }

  $scope.logged = function() {
    return $rootScope.loggedIn;
  }

  $scope.checkSession = function() {
    Auth.checkSession()
    .then(function(data) {
      $rootScope.displayName = data.data.displayName;
      $rootScope.user = data.data.username;
      $rootScope.loggedIn = true;
    })
  }

  //if display name ends with letter s, it'll make it s' instead of 's for dashboard header
  $scope.checkName = function() {
    if ($scope.displayName && $scope.displayName[$scope.displayName.length - 1] === 's') {return true;}
  }

  $scope.getAllWafflers = function() {
    Dashboard.getAllWafflers()
    .then(function(data) {
      data.forEach(function(waffler) {
        if ($rootScope.waffler_ids.indexOf(waffler.id) === -1) {
          $rootScope.wafflers.push(waffler);
          $rootScope.waffler_ids.push(waffler._id);
        }
      }, function(err) {
        console.log("Couldn't retrieve Wafflers: ", err)
      })
    })
  }

  $scope.loadUserBlog = function() {
    Dashboard.loadUserBlog($stateParams.endPath)
    .then(function(data) {
      $scope.blogAuthor = data.displayName; 
      data.posts.forEach(function(post) {
        console.log(post)
        if ($scope.post_ids.indexOf(post._id) == -1) {
          $scope.posts.push(post);
          $scope.post_ids.push(post._id);
        }
      }, function(err) {
        console.log("Couldn't retrieve posts: ", err);
      });

    });
  }

})
