angular.module('waffle.auth', [])

.controller('AuthController', function ($scope, $location, $rootScope, Auth, $window) {
	var userId;
	if (window.localStorage.getItem('userId')) {
		userId = window.localStorage.getItem('userId');
		// }
		// if (userId) {
		$rootScope.userId = userId;
		console.log('userId:', userId);
		$location.path('/dashboard');
	}

	$scope.login = function () {
		if (!$scope.username || !$scope.password) {
			alert('Username and password required!')
			return;
		}
		Auth.login($scope.username, $scope.password)
			.then(function (data) {
				$rootScope.user = $scope.username;
				$rootScope.userId = data.data;
				window.localStorage.setItem('username', $scope.user);
				console.log('data: ', data);
				console.log('$rootScope.user: ', $rootScope.user);
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