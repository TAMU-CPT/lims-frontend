/**
 * Logout controller
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("LogOutCtrl", ["$scope", "$http", "$localStorage", "$location", "Raven",
		function($scope, $http, $localStorage, $location, Raven) {
			$localStorage.jwtToken = null;
			$localStorage.jwtData = {};
            Raven.setUserContext();
			$scope.nav.userData = $localStorage.jwtData;
			$location.path("/");
		},
	]);
}
