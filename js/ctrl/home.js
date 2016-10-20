export default function(base) {
	base.controller('HomeCtrl', ['$scope','$location',
	    function($scope, $location) {
	        $scope.home = [
	            {
	                title: "EditingRoleUsers",
	                url: "#/editingroleusers",
	            },
	            {
	                title: "EditingRoleGroups",
	                url: "#/editingrolegroups",
	            },
	            {
	                title: "Bioprojects",
	                url: "#/bioprojects",
	            },
	            {
	                title: "PersonTags",
	                url: "#/persontags",
	            },
	            {
	                title: "Organisations",
	                url: "#/organisations",
	            },
	            {
	                title: "Boxs",
	                url: "#/boxs",
	            },
	            {
	                title: "StorageLocations",
	                url: "#/storagelocations",
	            },
	            {
	                title: "Assemblys",
	                url: "#/assemblys",
	            },
	            {
	                title: "TubeTypes",
	                url: "#/tubetypes",
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
	                title: "Tubes",
	                url: "#/tubes",
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
	                title: "ContainerTypes",
	                url: "#/containertypes",
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
	            {
	                title: "Apps",
	                url: "#/apps",
	            },
	            {
	                title: "Accounts",
	                url: "#/accounts",
	            },
	            {
	                title: "EmailConfirmations",
	                url: "#/emailconfirmations",
	            },
	            {
	                title: "SignupCodeResults",
	                url: "#/signupcoderesults",
	            },
	            {
	                title: "SignupCodes",
	                url: "#/signupcodes",
	            },
	            {
	                title: "EmailAddresses",
	                url: "#/emailaddresses",
	            },
	            {
	                title: "AccountDeletions",
	                url: "#/accountdeletions",
	            },
	            {
	                title: "AnonymousAccounts",
	                url: "#/anonymousaccounts",
	            },
// LOAD HOMEITEMS
	        ];
	}]);
}
