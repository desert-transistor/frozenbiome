angular
	    .module('waffle', [])
      .controller('PhotoController', ['$scope', '$http', '$upload', function($scope, $http, $upload){
        console.log("loading photo controller...")
        $scope.id = $state.params.id; //what is this??
        $scope.dataLoaded = false;
        $scope.prompt = {};
        $scope.userId = Auth.getUserId();
        $scope.userPhotoSubmission = undefined;
        $scope.submissionPeriodIsOpen = false;
        $scope.photoTaken = false;

        $scope.onFileSelect = function($files){
          var file = $files[0];
          $scope.upload = $upload.upload({
            method: 'POST',
            url:  'api/photo',
            data: {
              prompt_id: $scope.id,
              user_id:   Auth.getUserId();
            },
            file: file
          })
          .progress(function(evt){
            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total))
          })
          .success(function(data, status, headers, config){
            $state.reload();
          })
          .error(function(error){
            console.log('ERROR: '. error);
          });
        };

        

      }])