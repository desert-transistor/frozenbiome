angular.module('waffle.nav', [])

.controller('NavController', function ($scope, $location, $rootScope, Auth) {
	$scope.logout = function () {
		Auth.logout();
		$rootScope.user = '';

	}

	$scope.checkSession = function () {
		("nav checking session")
		Auth.checkSession();
	}

})