var moment = require('moment');

/**
 * Custom filters used in HTML
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.filter('human_time_abs', function(){
		return function(input) {
			if(input){
				return moment(input).format('lll');
			}else {
				return "Unknown";
			}
			//return moment(input).calendar();
		}
	});

	base.filter("role_icon", function() {
		return function(input) {
			switch(parseInt(input)) {
			case 0:
			case "view":
				return "visibility";
			case 1:
			case "edit":
				return "edit";
			case 2:
			case "admin":
				return "person";
			case 3:
			case "owner":
				return "person";
			}
		};
	});

	base.filter("host_formatter", ["$sce", function($sce) {
		return function(input) {
			if (input) {
				var data = "<i>" + input.genus +" " + (input.species ? input.species : "??")+ "</i>";
				if(input.strain){
					data += " " + input.strain;
				}
				return $sce.trustAs("html",  data);
			}
			return;
		};
	}]);

	base.filter("role_type_icon", function($sce) {
		return function(input) {
			switch(input) {
			case "user": // view
				return "person";
			case "group": // edit
				return "group";
			default:
				return "person";
			}
		};
	});

	base.filter("storage_type_to_text", function() {
		return function(input) {
			switch(input) {
			case 0:
				return "Fridge";
			case 1:
				return "Freezer";
			}
		};
	});

	base.filter("sample_category_filter", function() {
		return function(input) {
			switch(input) {
			case 'lysate':
				return "Lysate";
			case 'phagednaprep':
				return "DNA Prep";
			case 'envsample':
				return "Environmental Sample";
			}
		};
	});

	base.filter("box_filter", function() {
		return function(input) {
            if (input == "") {
                return 'None';
            } else { return input; }
		};
	});

	base.filter("box_filter_selection", function() {
		return function(input) {
            if (input == "") {
                return 'All';
            } else { return input; }
		};
	});


	// http://stackoverflow.com/questions/11540157/using-comma-as-list-separator-with-angularjs/18773958#18773958
	base.filter('joinBy', function () {
		return function (input,delimiter) {
			return (input || []).join(delimiter || ',');
		};
	});

}
