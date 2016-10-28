export default function(base) {
	base.filter('role_icon', function() {
		return function(input) {
			switch(input){
				case 0: // view
					return "visibility";
				case 1: // edit
					return "edit";
				case 2: // admin
					return "person";
			}
		};
	});

	base.filter('host_formatter', ['$sce', function($sce) {
		return function(input) {
			return $sce.trustAs('html', "<i>" + input.genus +" " + input.species + "</i> " + input.strain);
		};
	}]);

	base.filter('role_type_icon', function($sce) {
		return function(input) {
			switch(input){
				case 'user': // view
					return 'person';
				case 'group': // edit
					return 'group';
				default:
					return 'person';
			}
		};
	});
}
