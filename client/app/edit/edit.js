angular.module('waffle.edit', [])

.controller('EditController', ['$scope', '$rootScope', 'Edit', 'Dashboard', '$location', 'Auth', '$http', '$upload', '$state', function($scope, $rootScope, Edit, Dashboard, $location, Auth, $http, $upload, $state) {

  $scope.getRandomName = function() {
    arr = ['Alex Hawkins', 'Evan Spiler', 'David Kae', 'Grant Wu'];
    var pos = Math.floor((Math.random() * 4));
    return arr[pos];
  }

  $scope.submit = function(title, content, created) {
    console.log(Edit.imageId);
  	Edit.addPost(this.title, this.content, $rootScope.user, Edit.imageId || null, this.created)
    .success(function(data) {
      console.log("SUCCESS: ", data)
    })
    .error(function(err, data) {
      console.log("ERROR", err);
      console.log("DATA", data);
    });
    
    $location.path('/');
  }

  $scope.updatePost = function(title, content) {
    console.log("TRYING")
    console.log($rootScope.displayName)
    Edit.updatePost(title, content, $rootScope.postID)
    .success(function(data) {
  	  console.log("SUCCESS: ", data)
  	})
    .error(function(err, data) {
      console.log("ERROR", err);
      console.log("DATA", data);
    });

    $location.path('/');
  }

  $scope.checkSession = function() {
    Auth.checkSession()
    .then(function(data) {   ///data is UNDEFINED
      $rootScope.displayName = data.data.displayName;
      $rootScope.user = data.data.username;
      $rootScope.loggedIn = true;
    })
  }

  console.log("loading photo controller...")
  
  $scope.dataLoaded = false;
  $scope.prompt = {};
  $scope.userId =  null;    //Auth.getUserId();
  $scope.userPhotoSubmission = undefined;
  $scope.submissionPeriodIsOpen = false;
  $scope.photoTaken = false;

  
  $scope.onFileSelect = function(files){
                            console.log($scope.title + Auth.currentUser);
    var file = files[0];
                            console.log(file);
    $scope.upload = $upload.upload({
      method: 'POST',
      url:  'api/photo-upload',
      data: {
        prompt_id: $scope.imageId,
        user_id:   Auth.currentUser      
      },
      file: file
    })
    .progress(function(evt){
      // console.log(evt);
      console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total))
    })
    .success(function(data, status, headers, config){
      Edit.imageId = data;
      console.log(Edit.imageId);
                            console.log(status);
                            console.log(headers);
                            console.log(config);
      // $state.reload();                             ///fixes the issue of the content disappearing. What is the side affect of removing it??
    })
    .error(function(error){
      console.log('ERROR: '. error);
    })
  }


}])


//when finishing the upload, send back the url to the image
//make the onFileSelect function wait for a response from the server
//when it gets a response, have it set the imageUrl to the response
//put the imageUrl into the post submission so each post has a url to the image that was saved with it