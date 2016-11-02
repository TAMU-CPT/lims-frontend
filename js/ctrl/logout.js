export default function(base) {
	base.controller("LogOutCtrl", ["$scope", "$http", "$localStorage", "$location",
		function($scope, $http, $localStorage, $location) {
			$localStorage.jwtToken = null;
			$localStorage.jwtData = {};
			$scope.nav.userData = $localStorage.jwtData;
			$location.path("/");
		},
	]);
}
