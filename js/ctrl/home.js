/**
 * Home controller
 * @param {object} base Base angular application object
 */
export default function(base) {
	base.controller("HomeCtrl", ["$scope", "$location",
		function($scope, $location) {
			$scope.home = [
				{ name: "Biological Data",
					hue: 3,
					routes: [
						{
							title: "Bioprojects",
							url: "#/bioprojects",
						},
						{
							title: "ExperimentalResults",
							url: "#/experimentalresults",
						},
						{
							title: "SampleTypes",
							url: "#/sampletypes",
						},
						{
							title: "Experiments",
							url: "#/experiments",
						},
						{
							title: "Phages",
							url: "#/phages",
						},
						{
							title: "PhageDNAPreps",
							url: "#/phagednapreps",
						},
						{
							title: "Environmental Samples",
							url: "#/environmentalsamples",
						},
						{
							title: "Environmental Sample Collections",
							url: "#/environmentalsamplecollection",
						},
						{
							title: "Lysates",
							url: "#/lysates",
						},
						{
							title: "Bacterias",
							url: "#/bacterias",
						},
					],
				},
				{ name: "Sequencing & Assembly",
					hue: 3,
					routes: [
						{
							title: "SequencingRuns",
							url: "#/sequencingruns",
						},
						{
							title: "Assemblys",
							url: "#/assemblys",
						},
					],
				},
				{ name: "Annotation",
					hue: 3,
					routes: [
						{
							title: "Annotation",
							url: "#/annotation",
						},
					],
				},
				{ name: "Directory Services",
					hue: 2,
					routes: [
						{
							title: "Organizations",
							url: "#/organisations",
						},
						{
							title: "People",
							url: "#/accounts",
						},
					],
				},
				{ name: "Storage",
					hue: 1,
					routes: [
						{
							title: "TubeTypes",
							url: "#/tubetypes",
						},
						{
							title: "Tubes",
							url: "#/tubes",
						},
						{
							title: "ContainerTypes",
							url: "#/containertypes",
						},
						{
							title: "Boxs",
							url: "#/boxs",
						},
						{
							title: "StorageLocations",
							url: "#/storagelocations",
						},
					],
				},
			];
			// $scope.home = [
			// ];
		}]);
}
