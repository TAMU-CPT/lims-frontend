/**
 * Sequencing Run Detail
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("SequencingRunDetailCtrl", ["$scope", "$location", "$routeParams", "Restangular", '$timeout', "$mdToast",
		function($scope, $location, $routeParams, Restangular, $timeout, $mdToast) {
			$scope.disabled = true;
			// TODO: autosave

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

			$scope.add_pool = function() {
				$scope.models.lists.push([]);
			}

			$scope.remove_empty_pools = function() {
				$scope.models.lists = $scope.models.lists.filter(function(d){
					return d.length > 0;
				})
			}

			$scope.models = {
				selected: null,
				unsorted: [
				],
				lists: [
					[],
				]
			};

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

			$scope.save = function(final){
				//$scope.sequencingrun.sequencingrunpool_set = $scope.models.lists.map(function(pool, idx){
					//return {
						//'pool': idx,
						//'sequencingrunpoolitem_set': pool
					//}
				//});
				$scope.sequencingrun.sequencingrunpool_set= [
					{
						"id": "ebfa4595-cfee-4dea-88af-b8bd0b33d1f4",
						"pool": "0",
						"sequencingrunpoolitem_set": []
					}
				];
				$scope.finalized = final;
				$scope.sequencingrun.save();
				//}).then(function(data) {
					//$mdToast.showSimple("Success");
					//$scope.submit_disabled = false;
				//}, function() {
					//$mdToast.showSimple("Error");
				//});
			};

			$scope.finalize = function(){
				$scope.save(true);
			};

			Restangular.all("lims/sequencingrunpoolitems").getList({'no_pool': true}).then(function(data) {
				$scope.models.unsorted = data;
			});
			//Restangular.all("lims/sequencingrunpoolitems").get().then(function(data) {
				//cosnole.log(data);
			//});

			Restangular.one("lims/sequencingruns", $routeParams.sequencingrunID).get().then(function(data) {
				$scope.sequencingrun = data;
				$scope.models.lists = $scope.sequencingrun.sequencingrunpool_set;
				$scope.owner_set = [$scope.sequencingrun.owner];
			});
		}]);
}
