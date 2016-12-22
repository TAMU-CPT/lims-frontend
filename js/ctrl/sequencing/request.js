/**
 * Sequencing Run Request
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("SequencingRunListCtrl", [
		"$scope", "$location", "$routeParams", "Restangular", "GLOBAL_PAGINATION_LIMIT","$mdDialog",
		function($scope, $location, $routeParams, Restangular, GLOBAL_PAGINATION_LIMIT, $mdDialog) {
			//
		}
	]);
}
