/**
 * Custom directives
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.directive('userChip', ['$go', function($go){
		return {
			restrict: 'E',
			scope: {
				user: '=',
			},
			templateUrl: 'partials/directives/user-chip.html'
		};
	}]);

	base.directive('dnaPrepCard', ['$go', function($go){
		return {
			restrict: 'E',
			scope: {
				data: '=',
			},
			link: function(scope, element, attr){
				scope.go = $go;
			},
			templateUrl: 'partials/directives/dna-prep-card.html'
		};
	}]);

	base.directive('phageCard', ['$go', function($go){
		return {
			restrict: 'E',
			scope: {
				data: '=phage',
			},
			link: function(scope, element, attr){
				scope.go = $go;
			},
			templateUrl: 'partials/directives/phage-card.html'
		};
	}]);

	base.directive('phageCardVariant', ['$go', function($go){
		return {
			restrict: 'E',
			scope: {
				data: '=phage',
			},
			link: function(scope, element, attr){
				scope.go = $go;
			},
			templateUrl: 'partials/directives/phage-card-variant.html'
		};
	}]);

	base.directive('phageStatus', ['$go', function($go){
		return {
			restrict: 'E',
			scope: {
				data: '=data',
			},
			templateUrl: 'partials/directives/phage-status.html'
		};
	}]);

	base.directive('phageBadge', ['$go', function($go){
		return {
			restrict: 'E',
			scope: {
				data: '=phage',
			},
			link: function(scope, element, attr){
				scope.go = $go;
			},
			templateUrl: 'partials/directives/phage-badge.html'
		};
	}]);

	base.directive('bactBadge', function(){
		return {
			restrict: 'E',
			scope: {
				data: '=data',
			},
			templateUrl: 'partials/directives/bact-badge.html'
		};
	});

	base.directive('storageBadge', function(){
		return {
			restrict: 'E',
			scope: {
				data: '=location',
			},
			templateUrl: 'partials/directives/storage-badge.html'
		};
	});

	base.directive('progressArrow', function(){
		return {
			restrict: 'E',
			templateUrl: 'partials/directives/arrow.html'
		};
	});
}
