/**
 * Custom services
 * @param {object} base Base angular application object
 */
export default function(base) {
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

					markers[sample.id] = {
						lat: sample.location_xy[1],
						lng: sample.location_xy[0],
						message: "<b>Environmental Sample</b><br />Type: " + sample.sample_type.name + "<br />Desc: " + sample.description + "<br />Collected by: " + collected_by,
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
