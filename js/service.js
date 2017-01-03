var moment = require('moment');

/**
 * Custom services
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.service('$cptStorage', ['Restangular', function(Restangular){
		var serviceObject = {
			room: {
				selectedItem: null,
				searchText: null,
				querySearch: function(queryString) {
					return Restangular.all("lims").customGET("storage/rooms", {room: queryString}).then(function(data) {
						return data.results;
					});
				},
				selectedItemChange: function(item) {
				},
			},

			storage_type: {
				types: [0,1],
				type: 0,
				selectedItem: null,
				searchText: null,
				querySearch: function(queryString) {
					return Restangular.all("lims").customGET("storage/container_labels", {room: serviceObject.room.searchText, type: serviceObject.storage_type.type, container_label: serviceObject.storage_type.searchText}).then(function(data) {
						return data.results;
					});
				},
				selectedItemChange: function(item) {
				},
				reset: function() {
					serviceObject.storage_type.searchText = null;
					serviceObject.storage_type.selectedItem = null;
				},
			},

			box: {
				selectedItem: null,
				searchText: null,
				querySearch: function(queryString) {
					return Restangular.all("lims").customGET("storage/boxes", {room: serviceObject.room.searchText, type: serviceObject.storage_type.type, container_label: serviceObject.storage_type.searchText, shelf: serviceObject.shelf, box: serviceObject.box.searchText}).then(function(data) {
						return data.results;
					});
				},
				selectedItemChange: function(item) {
				},
				reset: function() {
					serviceObject.box.searchText = null;
					serviceObject.box.selectedItem = null;
				},
			},

			get_form: function(){
				return {
					// Room              | room
					room: serviceObject.room.selectedItem ? serviceObject.room.selectedItem.room : serviceObject.room.searchText,
					// Fridge / Freezer  | type
					type: serviceObject.storage_type.type,
					// Fridge Name       | container_label
					container_label: serviceObject.storage_type.selectedItem ? serviceObject.storage_type.selectedItem.type : serviceObject.storage_type.searchText,
					// Shelf/Rack        | shelf
					shelf: serviceObject.shelf,
					// Box Label         | box
					box: serviceObject.box.selectedItem ? serviceObject.box.selectedItem.box: serviceObject.box.searchText,
					// Sample Label      | sample_label
					sample_label: serviceObject.tube_label,
				}
			}
		};

		return serviceObject;
	}]);



	base.service('$go', ['$location', function($location){
		return {
			sequencing: function(id) {
				$location.path("/sequencing/" + id);
			},

			sequencing_request: function(id) {
				$location.path("/sequencing/request/" + id);
			},

			dnaprep_create: function(id) {
				$location.path("/phagednapreps/create/" + id);
			},

			envsample: function(id) {
				$location.path("/environmentalsamples/" + id);
			},

			lysate: function(id){
				$location.path("/lysates/" + id);
			},

			phage: function(id){
				$location.path("/phages/" + id);
			},

			storage: function(id){
				$location.path("/storage/" + id);
			}
		}
	}]);

	base.service('$humanTime', function(){
		return {
			c: function(datetime){
				return moment(datetime);
			},
			f: function(datetime) {
				var m = moment(datetime);
				return {
					abs: m.calendar(),
					rel: m.fromNow(),
					day: m.format('LL'),
					m: m,
				}
			}
		}
	});

	base.service("$mdLoginToast", function($mdToast) {
		return {
			show: function(content) {
				return $mdToast.show(
				$mdToast.simple()
				.content(content)
				.position("top right")
				.hideDelay(2000)
			);},
		};
	});

	base.service("$mapHandler", function() {
		return {
			calculateMap: function(data) {
				let markers = {};
				// Create markers
				data.forEach(function(sample) {
					var collected_by = "Unknown";
					if(sample.collected_by){
						collected_by = '<a href="#/accounts/' + sample.collected_by.id + '">' + sample.collected_by.name + '</a>';
					}

					markers[sample.id.replace(/-/g, '_')] = {
						lat: sample.location_xy[1],
						lng: sample.location_xy[0],
						message: "<b>Environmental Sample</b><br />Type: " + sample.sample_type + "<br />Desc: " + sample.description + "<hr/>Collected by: " + collected_by + "<br/>Collected: " + moment(sample.collection).calendar(),
						focus: false,
						draggable: false,
					};
				});
				// Grab all points
				let points = data.map(function(e) {
					return [e.location_xy[1], e.location_xy[0]];
				});

				let maxbounds = null;
				let center = null;

				// If there are multiple points, calculate bounds using their
				// library, otherwise just use the single point as the bounds.
				if(points.length > 1) {
					var lats = points.map(function(e){ return e[0] });
					var lons = points.map(function(e){ return e[1] });
					var lat_max = Math.max.apply(0, lats);
					var lat_min = Math.min.apply(0, lats);
					var lon_max = Math.max.apply(0, lons);
					var lon_min = Math.min.apply(0, lons);

					center = {
						lat: (lat_max + lat_min) / 2,
						lng: (lon_max + lon_min) / 2,
						zoom: 2,
					};
				} else {
					center = {
						lat: points[0][0],
						lng: points[0][1],
						zoom: 9,
					};
					// If only one marker, focus on that.
					markers[Object.keys(markers)[0]].focus = true;
				}

				return {
					bounds: maxbounds,
					markers: markers,
					center: center,
				};

			},
		};
	});
}
