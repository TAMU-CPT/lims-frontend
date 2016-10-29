export default function(base) {
	base.controller('BioprojectDetailCtrl', ['$scope','$location','$routeParams', 'Restangular', 'PERMISSION_LEVELS', '$mdDialog', '$log', '$q',
		function($scope, $location, $routeParams, Restangular, PERMISSION_LEVELS, $mdDialog, $log, $q) {
			$scope.disabled = true;
			$scope.disabled_samples = true;
			$scope.permissions = PERMISSION_LEVELS;

			// Project Info
			$scope.edit_data = function() {
				$scope.disabled = false;
			}

			$scope.edit_data_save = function(){
				$scope.promise = $scope.data.save();
				$scope.original_data = angular.copy($scope.data);
				$scope.disabled = true;
			}

			$scope.edit_data_cancel = function(){
				$scope.disabled = true;
				$scope.data = angular.copy($scope.original_data);
			}

			$scope.edit_data_delete = function() {
				$scope.promise = $scope.data.remove();
				$location.path('/bioprojects/');
			}


			// Samples
			$scope.edit_samples = function() {
				$scope.disabled_samples = false;
			}

			$scope.edit_samples_save = function(){
				// First create all the objects that are new
				var requests = [];
				var new_samples = [];
				for(var idx = 0; idx < $scope.samples.length; idx++){
					if($scope.samples[idx].id === "new"){
						// New object, must be created in db.
						new_samples.push({
							id: -1,
							historical_names: "",
							primary_name: $scope.samples[idx].primary_name,
						});
					} else {
						new_samples.push($scope.samples[idx]);
					}
				}
				$scope.data.sample = new_samples;
				$scope.data.save().then(function(resp){
					$scope.samples = resp.sample;
				});

                //for(var currentPage = 0; currentPage < Math.ceil(outer_data.meta.count / pageSize); currentPage++) {
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
				$scope.data.editingrolegroup_set = $scope.share.shareWith.filter(function(el){ if('group' in el){ return el } });
				$scope.data.editingroleuser_set = $scope.share.shareWith.filter(function(el){ if('user' in el){ return el } });

				$scope.promise = $scope.data.save();
				$mdDialog.cancel();
			};

			$scope.popup_cancel = function() {
				$mdDialog.cancel();
			};

			// ShareData
			$scope.share = {
				shareWith: [],
				searchTextUser: "",
				searchTextGroup: "",
				localObjType: function(obj){
					if('user' in obj){ return 'user' }
					else { return 'group' }
				},
				removeShareTarget: function(o) {
					$scope.share.shareWith = $scope.share.shareWith.filter(function(e){
						console.log(e.id, o.id, $scope.share.localObjType(e), $scope.share.localObjType(o));
						if($scope.share.localObjType(e) === $scope.share.localObjType(o)){
							if( e.id === o.id ){
								return false;
							}
						}
						return true;
					});
				},
				selectedItemChange: function(item) {
					// Change includes change away from, so need to
					// discard nulls.
					console.log(item);
					if(!item){ return; }

					// Add the item + clear the box.
					//
					if($scope.share.shareWith.some((e) => e.id === item.id && e.type == item.type)){
						//function(e){ return e.id === item.id; })){
						if('netid' in item){
							$scope.share.searchTextUser = "";
							$scope.share.selectedItemUser = null;
						} else {
							$scope.share.searchTextGroup = "";
							$scope.share.selectedItemGroup = null;
						}
						return;
					}

					// Datastructure to hold our nascent permission object
					var ds = {
						bioproject: $scope.data.id,
						role: 0,
					};

					// Add the item to the appropriate slot (yes this design sucks).
					if('netid' in item){
						ds.user = item
					} else {
						ds.group = item
					}

					// Add to our shareWith
					$scope.share.shareWith.push(ds);

					if('netid' in item){
						$scope.share.searchTextUser = "";
						$scope.share.selectedItemUser = null;
					} else {
						$scope.share.searchTextGroup = "";
						$scope.share.selectedItemGroup = null;
					}
				},
				querySearchUser: function(queryString){
					return Restangular.all("account").customGET("accounts", {name: queryString}).then(function(data){
						$log.info(data.results);
						return data.results
					});
				},
				querySearchGroup: function(queryString){
					return Restangular.all("directory").customGET("groups", {name: queryString}).then(function(data){
						$log.info(data.results);
						return data.results
					});
				}
			};

			// Add phage dialog
			$scope.popup_search = function(ev) {
				$mdDialog.show({
					contentElement: '#add_sample',
					parent: angular.element(document.body),
					clickOutsideToClose: true
				});
			};


			$scope.ctrl = {
				transformChip(chip) {
					// If it is an object, it's already a known chip
					if (angular.isObject(chip)) {
						return chip;
					};

					// Otherwise, create a new one
					return {
						primary_name: chip,
						id: 'new'
					}
				},
				selectedItem: null,
				searchText: null,
				querySearch: function(queryString){
					return Restangular.all('lims').customGET('phages', {name: queryString}).then(function(data) {
						return data.results
					});
				}
			}

			$scope.go_user = function(id){
				$location.path('/accounts/' + id);
			}

			Restangular.one('bioproject/bioprojects', $routeParams.bioprojectID).get().then(function(data) {
				$scope.data = data;
				// Update share-with list
				$scope.share.shareWith = data.editingrolegroup_set.concat(data.editingroleuser_set);
				$scope.samples = JSON.parse(JSON.stringify(data.sample)); //angular.copy(data.sample);
				$scope.original_data = angular.copy(data);
			});
	}]);
}
