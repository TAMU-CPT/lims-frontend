window._ = require("lodash");
require("angular");
require("angular-route");
require("restangular");
require("angular-resource");
require("angular-material");
require("angular-material-icons");
require("angular-aria");
require("angular-gravatar");
require("angular-material-data-table");
require("angular-messages");
require("angular-animate");
require("jquery");
require("ngstorage");
require("angular-jwt");
require("leaflet");
require("angular-leaflet-directive");
require("angular-google-picker/dist/google-picker.js");
require("angular-drag-and-drop-lists");
var Raven = require('raven-js');

Raven
    .config('https://3891355533d043d1939f2cdca4361d21@cptgnome.tamu.edu/11')
    .addPlugin(require('raven-js/plugins/angular'), angular)
    .install();

let base = angular.module("base", [
	"ngRoute",
	"restangular",
	"ngMdIcons",
	"ngMaterial",
	"ui.gravatar",
	"ngMessages",
	"ngAnimate",
	"md.data.table",
	"leaflet-directive",
	"lk-google-picker",
	"dndLists",
	"ngStorage", // https://github.com/gsklee/ngStorage
]);


base.config(["$routeProvider", "$httpProvider", "$mdThemingProvider", "gravatarServiceProvider", "RestangularProvider", "DRF_URL", "$compileProvider", "lkGoogleSettingsProvider",
	function($routeProvider, $httpProvider, $mdThemingProvider, gravatarServiceProvider, RestangularProvider, DRF_URL, $compileProvider, lkGoogleSettingsProvider) {
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftps?|sftp|http|mailto|fax|tel):/);
		gravatarServiceProvider.defaults = {
			"size": 100,
			"default": "mm",  // Mystery (wo)man as default for missing avatars
		};
		gravatarServiceProvider.secure = true;
		gravatarServiceProvider.protocol = "my-protocol";
		$mdThemingProvider.theme("default")
			.primaryPalette("blue")
			.accentPalette("pink");


		lkGoogleSettingsProvider.configure({
			apiKey   : 'AIzaSyCyLHfEMUFec9BSDxuwb21qUNo7VTYm8OQ',
			clientId : '209566641071-f9edme4sktk76uh1dekuu8a1bsth58ao.apps.googleusercontent.com',
			scopes   : ['https://www.googleapis.com/auth/drive'],
			locale   : 'en',
			//features : ['..', '..'],
			//views    : ['..', '..']
		});

		$routeProvider.
			when("/bioprojects", {
				templateUrl: "partials/bioproject/list.html",
				controller: "BioprojectListCtrl",
			}).
			when("/bioprojects/:bioprojectID", {
				templateUrl: "partials/bioproject/detail.html",
				controller: "BioprojectDetailCtrl",
			}).

			when("/organisations", {
				templateUrl: "partials/organisation/list.html",
				controller: "OrganisationListCtrl",
			}).
			when("/organisations/:organisationID", {
				templateUrl: "partials/organisation/detail.html",
				controller: "OrganisationDetailCtrl",
			}).
			when("/storage", {
				templateUrl: "partials/storage/inventory.html",
				controller: "InventoryCtrl",
			}).
			when("/storage/add", {
				templateUrl: "partials/storage/storage_add.html",
				controller: "StorageAddCtrl",
			}).
			when("/assemblys", {
				templateUrl: "partials/assembly/list.html",
				controller: "AssemblyListCtrl",
			}).
			when("/assemblys/:assemblyID", {
				templateUrl: "partials/assembly/detail.html",
				controller: "AssemblyDetailCtrl",
			}).
			when("/experimentalresults", {
				templateUrl: "partials/experimentalresult/list.html",
				controller: "ExperimentalResultListCtrl",
			}).
			when("/experimentalresults/:experimentalresultID", {
				templateUrl: "partials/experimentalresult/detail.html",
				controller: "ExperimentalResultDetailCtrl",
			}).
			when("/sequencingruns", {
				templateUrl: "partials/sequencingrun/list.html",
				controller: "SequencingRunListCtrl",
			}).
			when("/sequencingruns/:sequencingrunID", {
				templateUrl: "partials/sequencingrun/detail.html",
				controller: "SequencingRunDetailCtrl",
			}).
			when("/sampletypes", {
				templateUrl: "partials/sampletype/list.html",
				controller: "SampleTypeListCtrl",
			}).
			when("/sampletypes/:sampletypeID", {
				templateUrl: "partials/sampletype/detail.html",
				controller: "SampleTypeDetailCtrl",
			}).
			when("/experiments", {
				templateUrl: "partials/experiment/list.html",
				controller: "ExperimentListCtrl",
			}).
			when("/experiments/:experimentID", {
				templateUrl: "partials/experiment/detail.html",
				controller: "ExperimentDetailCtrl",
			}).
			when("/phages", {
				templateUrl: "partials/phage/list.html",
				controller: "PhageListCtrl",
			}).
			when("/phages/:phageID", {
				templateUrl: "partials/phage/detail.html",
				controller: "PhageDetailCtrl",
			}).
			when("/phagednapreps", {
				templateUrl: "partials/phagednaprep/list.html",
				controller: "PhageDNAPrepListCtrl",
			}).
			when("/phagednapreps/:phagednaprepID", {
				templateUrl: "partials/phagednaprep/detail.html",
				controller: "PhageDNAPrepDetailCtrl",
			}).
			when("/sequencingrunpools", {
				templateUrl: "partials/sequencingrunpool/list.html",
				controller: "SequencingRunPoolListCtrl",
			}).
			when("/sequencingrunpools/:sequencingrunpoolID", {
				templateUrl: "partials/sequencingrunpool/detail.html",
				controller: "SequencingRunPoolDetailCtrl",
			}).
			when("/sequencingrunpoolitems", {
				templateUrl: "partials/sequencingrunpoolitem/list.html",
				controller: "SequencingRunPoolItemListCtrl",
			}).
			when("/sequencingrunpoolitems/:sequencingrunpoolitemID", {
				templateUrl: "partials/sequencingrunpoolitem/detail.html",
				controller: "SequencingRunPoolItemDetailCtrl",
			}).
			when("/environmentalsamples", {
				templateUrl: "partials/environmentalsample/list.html",
				controller: "EnvironmentalSampleListCtrl",
			}).
			when("/environmentalsamples/:environmentalsampleID", {
				templateUrl: "partials/environmentalsample/detail.html",
				controller: "EnvironmentalSampleDetailCtrl",
			}).
			when("/environmentalsamplecollection", {
				templateUrl: "partials/environmentalsamplecollection/list.html",
				controller: "EnvironmentalSampleCollectionListCtrl",
			}).
			when("/environmentalsamplecollection/:environmentalsampleID", {
				templateUrl: "partials/environmentalsamplecollection/detail.html",
				controller: "EnvironmentalSampleCollectionDetailCtrl",
			}).
			when("/lysates", {
				templateUrl: "partials/lysate/list.html",
				controller: "LysateListCtrl",
			}).
			when("/lysates/:lysateID", {
				templateUrl: "partials/lysate/detail.html",
				controller: "LysateDetailCtrl",
			}).
			when("/bacteria", {
				templateUrl: "partials/bacteria/list.html",
				controller: "BacteriaListCtrl",
			}).
			when("/bacteria/:bacteriaID", {
				templateUrl: "partials/bacteria/detail.html",
				controller: "BacteriaDetailCtrl",
			}).
			when("/accounts", {
				templateUrl: "partials/account/list.html",
				controller: "AccountListCtrl",
			}).
			when("/accounts/:accountID", {
				templateUrl: "partials/account/detail.html",
				controller: "AccountDetailCtrl",
			}).
			when("/annotation", {
				templateUrl: "partials/annotation/list.html",
				controller: "AnnotationListCtrl",
			}).
			when("/annotation/:annotationID", {
				templateUrl: "partials/annotation/detail.html",
				controller: "AnnotationDetailCtrl",
			}).
// LOAD ROUTES
			when("/login", {
				templateUrl: "partials/login.html",
				controller: "LoginCtrl",
			}).
			when("/logout", {
				templateUrl: "partials/login.html",
				controller: "LogOutCtrl",
			}).
			when("/", {
				templateUrl: "partials/home.html",
				controller: "HomeCtrl",
			}).
			otherwise({
				redirectTo: "/",
			});

			// function loginRequired($q, $location, $localStorage) {
				// var deferred = $q.defer();
				// if ($localStorage.jwtToken) {
					// deferred.resolve();
				// } else {
					// $location.path('/login');
				// }
				// return deferred.promise;
			// };
		RestangularProvider.setBaseUrl(DRF_URL);
		RestangularProvider.setRequestSuffix("/");
		RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
			let extractedData;
			// .. to look for getList operations
			if (operation === "getList") {
			// .. and handle the data and meta data
				extractedData = data.results;
				extractedData.meta = {
					"count": data.count,
					"next": data.next,
					"previous": data.previous,
				};
			} else {
				extractedData = data;
			}
			return extractedData;
		});

		$httpProvider.interceptors.push(["$q", "$location", "$localStorage", function($q, $location, $localStorage) {
			return {
				"request": function(config) {
					config.headers = config.headers || {};
					if ($localStorage.jwtToken) {
						config.headers.Authorization = "JWT " + $localStorage.jwtToken;
					}
					return config;
				},
				"responseError": function(response) {
					console.log("Failed with", response.status, "status");
					if (response.status == 401 || response.status == 403 || response.status == 400 || response.status == 500) {
						console.log("bad");
						// $location.path('/login');
					}
					return $q.reject(response);
				},
			};
		}]);
	}]);

require("./directives.js")(base);
require("./factory.js")(base);
require("./filter.js")(base);
require("./service.js")(base);
require("./const.js")(base);
require("./ctrl/home.js")(base);
require("./ctrl/nav.js")(base);
require("./ctrl/login.js")(base);
require("./ctrl/logout.js")(base);
require("./ctrl/bioproject/list.js")(base);
require("./ctrl/bioproject/detail.js")(base);
require("./ctrl/organisation/list.js")(base);
require("./ctrl/organisation/detail.js")(base);
require("./ctrl/assembly/list.js")(base);
require("./ctrl/assembly/detail.js")(base);
require("./ctrl/experimentalresult/list.js")(base);
require("./ctrl/experimentalresult/detail.js")(base);
require("./ctrl/sequencingrun/list.js")(base);
require("./ctrl/sequencingrun/detail.js")(base);
require("./ctrl/sampletype/list.js")(base);
require("./ctrl/sampletype/detail.js")(base);
require("./ctrl/experiment/list.js")(base);
require("./ctrl/experiment/detail.js")(base);
require("./ctrl/phage/list.js")(base);
require("./ctrl/phage/detail.js")(base);
require("./ctrl/phagednaprep/list.js")(base);
require("./ctrl/phagednaprep/detail.js")(base);
require("./ctrl/sequencingrunpool/list.js")(base);
require("./ctrl/sequencingrunpool/detail.js")(base);
require("./ctrl/sequencingrunpoolitem/list.js")(base);
require("./ctrl/sequencingrunpoolitem/detail.js")(base);
require("./ctrl/environmentalsample/list.js")(base);
require("./ctrl/environmentalsample/detail.js")(base);
require("./ctrl/environmentalsamplecollection/list.js")(base);
require("./ctrl/environmentalsamplecollection/detail.js")(base);
require("./ctrl/lysate/list.js")(base);
require("./ctrl/lysate/detail.js")(base);
require("./ctrl/bacteria/list.js")(base);
require("./ctrl/bacteria/detail.js")(base);
require("./ctrl/account/list.js")(base);
require("./ctrl/account/detail.js")(base);
require("./ctrl/annotation/list.js")(base);
require("./ctrl/annotation/detail.js")(base);
require("./ctrl/storage/add.js")(base);
require("./ctrl/storage/inventory.js")(base);
// REQUIRE
