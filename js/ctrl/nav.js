/**
 * Navigation controller
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("NavCtrl", ["$scope", "$mdSidenav", "$localStorage", "$location", "$interval", "$mdDialog", "Raven",
		function($scope, $mdSidenav, $localStorage, $location, $interval, $mdDialog, Raven) {
			$scope.nav = {};
			$scope.nav.userData = $localStorage.jwtData;

			$scope.$on("$locationChangeStart", function(event) {
				if ($location.path() == "/login") {
					$scope.nav.show_login_button = false;
				} else {
					$scope.nav.show_login_button = true;
				}
			});

			$scope.go = function(route) {
				$location.path(route);
				// if (route == '/teams/') {
					// CacaoBackend.one('users', $scope.nav.userData.user_id).get().then(function(data) {
						// $location.path(route + data.group[0].id);
					// });
				// }
				// else if (route == '/users/') {
					// $location.path(route + $scope.nav.userData.user_id);
				// }
				// else { $location.path(route); }
			};

            $scope.showDialog = function($event) {
                $mdDialog.show({
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    clickOutsideToClose: true,
                    templateUrl: 'partials/bug-report.html',
                    controller: DialogController
            });

                function DialogController($scope, $mdDialog) {
                    $scope.closeDialog = function() {
                        $mdDialog.cancel();
                    }
                    $scope.sendBug = function() {
                        Raven.setUserContext({
                            id: $localStorage.jwtData.user_id,
                            username: $localStorage.jwtData.username,
                            email: $localStorage.jwtData.email
                        });
                        Raven.captureMessage($scope.bugreport, {
                            level: 'info'
                        });
                        $scope.closeDialog();
                    }
                };
            };

			// $scope.get_notifications = function() {
				// NotificationBackend.all('inbox').getList().then(function(data) {
					// if (data.plain().length > 0) {
						// $scope.nav.notifications = data;
					// } else {
						// $scope.nav.notifications = null;
					// }
				// });
			// };

			// $scope.get_notifications_wrapper = function() {
				// $scope.get_notifications();
				// $interval($scope.get_notifications, 30000);
			// };
		}]);
}
