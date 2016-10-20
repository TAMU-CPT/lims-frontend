export default function(base) {
	base.service('$mdLoginToast', function($mdToast) {
	    return {
	        show: function(content) {
	        return $mdToast.show(
	          $mdToast.simple()
	            .content(content)
	            .position('top right')
	            .hideDelay(2000)
	        )}
	    };
	});
}
