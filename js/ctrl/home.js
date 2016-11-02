export default function(base) {
	base.controller("HomeCtrl", ["$scope", "$location",
		function($scope, $location) {
			$scope.home = [
				{
					hue: 3,
					name: "Biological Data",
					routes: [
						{
							title: "Bioprojects",
							url: "#/bioprojects",
						},
						 {
							 title: "Assemblys",
							 url: "#/assemblys",
						 },
						 {
							 title: "ExperimentalResults",
							 url: "#/experimentalresults",
						 },
						 {
							 title: "SequencingRuns",
							 url: "#/sequencingruns",
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
							 title: "SequencingRunPools",
							 url: "#/sequencingrunpools",
						 },
						 {
							 title: "SequencingRunPoolItems",
							 url: "#/sequencingrunpoolitems",
						 },
						 {
							 title: "EnvironmentalSamples",
							 url: "#/environmentalsamples",
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
				{
					hue: 2,
					name: "Directory Services",
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
				{
					hue: 1,
					name: "Storage",
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
