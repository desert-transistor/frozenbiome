angular.module('waffle.auth', [])

.controller('AuthController', function ($scope, $location, $rootScope, Auth) {

	$scope.login = function () {
		if (!$scope.username || !$scope.password) {
			alert('Username and password required!')
			return;
		}
		Auth.login($scope.username, $scope.password)
			.then(function (data) {
				console.log('data: ', data);
				$rootScope.user = $scope.username;
				console.log('$rootScope.user: ', $rootScope.user);
				$rootScope.userId = data.data;
				console.log('$rootScope.userId: ', $rootScope.userId);
				// Auth.saveUser($scope.username);
				$location.path('/dashboard');
				//TODO redirect to dashboard
			}, function (err) {
				alert(err.data)
				$scope.username = '';
				$scope.password = '';
			})
	}

	$scope.signup = function () {
		if (!$scope.username || !$scope.password || !$scope.newDisplayName) {
			alert('All fields required!')
		}
		if ($scope.password !== $scope.passwordMatch) {
			alert('Passwords do not match!');
			return;
		}
		Auth.signup($scope.username, $scope.password, $scope.newDisplayName)
			.then(function (data) {
				$rootScope.user = $scope.username;
				$rootScope.displayName = $scope.newDisplayName;
				$location.path('/');
			}, function (err) {
				alert(err.data)
				$scope.username = '';
				$scope.password = '';
				$scope.passwordMatch = '';
				$scope.newDisplayName = '';
			})
	}

	$scope.logout = function () {
		Auth.logout();
		$rootScope.user = '';
	}

})