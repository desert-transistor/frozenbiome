angular.module('waffle.edit', [])

.controller('EditController', ['$scope', '$rootScope', 'Edit', 'Dashboard', '$location', 'Auth', '$http', '$upload', '$state', function($scope, $rootScope, Edit, Dashboard, $location, Auth, $http, $upload, $state) {

  $scope.getRandomName = function() {
    arr = ['Alex Hawkins', 'Evan Spiler', 'David Kae', 'Grant Wu'];
    var pos = Math.floor((Math.random() * 4));
    return arr[pos];
  }

  $scope.submit = function(title, content, created) {
    console.log(Edit.imageId);
    ///here Edit.imageId is an array
    console.log($rootScope.userId);
  	Edit.addPost(this.title, this.content, $rootScope.user, '['+ Edit.imageId + ']' || null, $rootScope.userId, this.created)
    ///now here it is not??

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
    for(var i = 0; i < files.length; i++){
      var file = files[i];
                              console.log(file);
      $scope.upload = $upload.upload({
        method: 'POST',
        url:  'api/photos/',
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
        Edit.imageId.push(data);
        $scope.imageNamesToDisplay = Edit.imageId;
        console.log($scope.imageNamesToDisplay);
        console.log("Edit.imageId is: ", Edit.imageId);
                              console.log(status);
                              console.log(headers);
                              console.log(config);
        // $state.reload();                             ///fixes the issue of the content disappearing. What is the side affect of removing it??
      })
      .error(function(error){
        console.log('ERROR: '. error);
      })
    }
  }


}])

///EXAMPLE


// myApp.controller('MyCtrl') = [ '$scope', '$upload', function($scope, $upload) {
  
//   $scope.$watch('files', function() {
//     for (var i = 0; i < $scope.files.length; i++) {
//       var file = $scope.files[i];
//       $scope.upload = $upload.upload({
//         url: 'server/upload/url', // upload.php script, node.js route, or servlet url
//         //method: 'POST' or 'PUT',
//         //headers: {'Authorization': 'xxx'}, // only for html5
//         //withCredentials: true,
//         data: {myObj: $scope.myModelObj},
//         file: file, // single file or a list of files. list is only for html5
//         //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
//         //fileFormDataName: myFile, // file formData name ('Content-Disposition'), server side request form name
//                                     // could be a list of names for multiple files (html5). Default is 'file'
//         //formDataAppender: function(formData, key, val){}  // customize how data is added to the formData. 
//                                                             // See #40#issuecomment-28612000 for sample code

//       }).progress(function(evt) {
//         console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :'+ evt.config.file.name);
//       }).success(function(data, status, headers, config) {
//         // file is uploaded successfully
//         console.log('file ' + config.file.name + 'is uploaded successfully. Response: ' + data);
//       });
//       //.error(...)
//       //.then(success, error, progress); // returns a promise that does NOT have progress/abort/xhr functions
//       //.xhr(function(xhr){xhr.upload.addEventListener(...)}) // access or attach event listeners to 
//                                                               //the underlying XMLHttpRequest
//     }
//     /* alternative way of uploading, send the file binary with the file's content-type.
//        Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
//        It could also be used to monitor the progress of a normal http post/put request. 
//        Note that the whole file will be loaded in browser first so large files could crash the browser.
//        You should verify the file size before uploading with $upload.http().
//     */
//     // $scope.upload = $upload.http({...})  // See 88#issuecomment-31366487 for sample code.

//   });
// }];