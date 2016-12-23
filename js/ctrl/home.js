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
							title: "Phages",
							url: "#/phages",
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
							url: "#/bacteria",
						},
					],
				},
				{ name: "Sequencing & Assembly",
					hue: 3,
					routes: [
						{
							title: "Sequencing Runs",
							url: "#/sequencing",
						},
						{
							title: "Assemblies",
							url: "#/assemblys",
						},
					],
				},
				//{ name: "Annotation",
					//hue: 3,
					//routes: [
						//{
							//title: "Annotation",
							//url: "#/annotation",
						//},
					//],
				//},
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
							title: "Add new tube",
							url: "#/storage/add",
						},
						{
							title: "inventory",
							url: "#/storage",
						},
					],
				},
			];
			// $scope.home = [
			// ];
		}]);
}
