/**
 * Sequencing Run Detail
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("SequencingRunDetailCtrl", ["$scope", "$location", "$routeParams", "Restangular", '$timeout',
		function($scope, $location, $routeParams, Restangular, $timeout) {
			$scope.disabled = true;

			// Project Info
			$scope.edit_data = function() {
				$scope.disabled = false;
			};

			$scope.edit_data_save = function() {
				$scope.promise = $scope.sequencingrun.save();
				$scope.original_data = angular.copy($scope.sequencingrun);
				$scope.disabled = true;
			};

			$scope.edit_data_cancel = function() {
				$scope.disabled = true;
				$scope.data = angular.copy($scope.original_data);
			};


			$scope.go_user = function(id) {
				$location.path("/accounts/" + id);
			};


			$scope.onPicked = function (docs, attr) {
				$scope.sequencingrun[attr] = docs[0].url;
			}

			$scope.onCancel = function () {
				console.log('Google picker close/cancel!');
			}




			$scope.loadSequencingMethods = function() {
				if($scope.seq_methods){
					return;
				}

				var promise = Restangular.one("lims/experiments")
				.get({
					category: "sequencing",
				}).then(function(data) {
					$scope.seq_methods = data.results;
				});
				return promise;
			};



			Restangular.one("lims/sequencingruns", $routeParams.sequencingrunID).get().then(function(data) {
				$scope.sequencingrun = data;
				$scope.owner_set = [$scope.sequencingrun.owner];
			});
		}]);
}
