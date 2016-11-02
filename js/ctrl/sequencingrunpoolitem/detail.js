/**
 * Sequencing Run Pool Item
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("SequencingRunPoolItemDetailCtrl", ["$scope", "$location", "$routeParams", "Restangular",
		function($scope, $location, $routeParams, Restangular) {
			Restangular.one("lims/sequencingrunpoolitems", $routeParams.sequencingrunpoolitemID).get().then(function(data) {
				$scope.sequencingrunpoolitem = data;
			});
		}]);
}
