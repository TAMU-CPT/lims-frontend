export default function(base) {
	base.controller('HomeCtrl', ['$scope','$location',
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
					]
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
					]
				}
			];
			//$scope.home = [
				//{
					//title: "Boxs",
					//url: "#/boxs",
				//},
				//{
					//title: "StorageLocations",
					//url: "#/storagelocations",
				//},
				//{
					//title: "Assemblys",
					//url: "#/assemblys",
				//},
				//{
					//title: "TubeTypes",
					//url: "#/tubetypes",
				//},
				//{
					//title: "ExperimentalResults",
					//url: "#/experimentalresults",
				//},
				//{
					//title: "SequencingRuns",
					//url: "#/sequencingruns",
				//},
				//{
					//title: "Tubes",
					//url: "#/tubes",
				//},
				//{
					//title: "SampleTypes",
					//url: "#/sampletypes",
				//},
				//{
					//title: "Experiments",
					//url: "#/experiments",
				//},
				//{
					//title: "Phages",
					//url: "#/phages",
				//},
				//{
					//title: "PhageDNAPreps",
					//url: "#/phagednapreps",
				//},
				//{
					//title: "SequencingRunPools",
					//url: "#/sequencingrunpools",
				//},
				//{
					//title: "SequencingRunPoolItems",
					//url: "#/sequencingrunpoolitems",
				//},
				//{
					//title: "ContainerTypes",
					//url: "#/containertypes",
				//},
				//{
					//title: "EnvironmentalSamples",
					//url: "#/environmentalsamples",
				//},
				//{
					//title: "Lysates",
					//url: "#/lysates",
				//},
				//{
					//title: "Bacterias",
					//url: "#/bacterias",
				//},
				//{
					//title: "Apps",
					//url: "#/apps",
				//},
				//{
					//title: "Accounts",
					//url: "#/accounts",
				//},
				//{
					//title: "EmailConfirmations",
					//url: "#/emailconfirmations",
				//},
				//{
					//title: "SignupCodeResults",
					//url: "#/signupcoderesults",
				//},
				//{
					//title: "SignupCodes",
					//url: "#/signupcodes",
				//},
				//{
					//title: "EmailAddresses",
					//url: "#/emailaddresses",
				//},
				//{
					//title: "AccountDeletions",
					//url: "#/accountdeletions",
				//},
				//{
					//title: "AnonymousAccounts",
					//url: "#/anonymousaccounts",
				//},
			//];
	}]);
}
