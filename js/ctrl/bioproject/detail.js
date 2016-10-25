export default function(base) {
	base.controller('BioprojectDetailCtrl', ['$scope','$location','$routeParams', 'Restangular', 'PERMISSION_LEVELS', '$mdDialog',
		function($scope, $location, $routeParams, Restangular, PERMISSION_LEVELS, $mdDialog) {
			$scope.disabled = true;
			$scope.disabled_samples = true;

			// Project Info
			$scope.edit_data = function() {
				$scope.disabled = false;
			}

			$scope.edit_data_save = function(){
				$scope.data.save();
				$scope.original_data = angular.copy($scope.data);
				$scope.disabled = true;
			}

			$scope.edit_data_cancel = function(){
				$scope.disabled = true;
				$scope.data = angular.copy($scope.original_data);
			}

			$scope.edit_data_delete = function() {
				$scope.data.remove();
				$location.path('/bioprojects/');
			}


			// Samples
			$scope.edit_samples = function() {
				$scope.disabled_samples = false;
			}

			$scope.edit_samples_save = function(){
				//$scope.organisation.save();
				//$scope.original_data = angular.copy($scope.organisation);
				$scope.disabled_samples = true;
			}

			$scope.edit_samples_cancel = function(){
				$scope.disabled_samples = true;
				//$scope.organisation = angular.copy($scope.original_data);
			}


			// Sharing
			$scope.popup_share = function(ev) {
				$mdDialog.show({
					contentElement: '#create',
					parent: angular.element(document.body),
					clickOutsideToClose: true
				});
			};

			$scope.popup_share_action = function() {
				$scope.promise = Restangular.all('bioproject/bioprojects').post({
					name: $scope.data.name,
					desc: $scope.data.description,
					editingrolegroup_set: $scope.data.editingrolegroup_set,
					editingroleuser_set: $scope.data.editingroleuser_set,
					sample: $scope.data.sample,
				}).then(function(data) {
					// asd;jkfh
				});
				$mdDialog.cancel();
			};

			$scope.popup_cancel = function() {
				$mdDialog.cancel();
			};



			$scope.go_user = function(id){
				$location.path('/accounts/' + id);
			}

			Restangular.one('bioproject/bioprojects', $routeParams.bioprojectID).get().then(function(data) {
				$scope.data = data;
				$scope.permissions = PERMISSION_LEVELS;
				$scope.original_data = angular.copy(data);
			});
	}]);
}
