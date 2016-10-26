window._ = require('lodash');
require('angular');
require('angular-route');
require('restangular');
require('angular-resource');
require('angular-material');
require('angular-material-icons');
require('angular-aria');
require('angular-gravatar');
require('angular-material-data-table');
require('angular-messages');
require('angular-animate');
require('jquery');
require('ngstorage');
require('angular-jwt');
var moment = require('moment');

var base = angular.module('base', [
	'ngRoute',
	'restangular',
	'ngMdIcons',
	'ngMaterial',
	'ui.gravatar',
	'ngMessages',
	'ngAnimate',
	'md.data.table',
	'ngStorage' // https://github.com/gsklee/ngStorage
]);

base.config(['$routeProvider', '$httpProvider', '$mdThemingProvider', 'gravatarServiceProvider', 'RestangularProvider', 'DRF_URL', '$compileProvider',
	function($routeProvider, $httpProvider, $mdThemingProvider, gravatarServiceProvider, RestangularProvider, DRF_URL, $compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftps?|sftp|http|mailto|fax|tel):/);
		gravatarServiceProvider.defaults = {
		  size	 : 100,
		  "default": 'mm'  // Mystery (wo)man as default for missing avatars
		};
		gravatarServiceProvider.secure = true;
		gravatarServiceProvider.protocol = 'my-protocol';
		$mdThemingProvider.theme('default')
			.primaryPalette('grey')
			.accentPalette('blue');
		$routeProvider.
			when('/bioprojects', {
				templateUrl: 'partials/bioproject-list.html',
				controller: 'BioprojectListCtrl'
			}).
			when('/bioprojects/:bioprojectID', {
				templateUrl: 'partials/bioproject-detail.html',
				controller: 'BioprojectDetailCtrl'
			}).

			when('/persontags', {
				templateUrl: 'partials/persontag-list.html',
				controller: 'PersonTagListCtrl'
			}).
			when('/persontags/:persontagID', {
				templateUrl: 'partials/persontag-detail.html',
				controller: 'PersonTagDetailCtrl'
			}).
			when('/organisations', {
				templateUrl: 'partials/organisation-list.html',
				controller: 'OrganisationListCtrl'
			}).
			when('/organisations/:organisationID', {
				templateUrl: 'partials/organisation-detail.html',
				controller: 'OrganisationDetailCtrl'
			}).
			when('/boxs', {
				templateUrl: 'partials/box-list.html',
				controller: 'BoxListCtrl'
			}).
			when('/boxs/:boxID', {
				templateUrl: 'partials/box-detail.html',
				controller: 'BoxDetailCtrl'
			}).
			when('/storagelocations', {
				templateUrl: 'partials/storagelocation-list.html',
				controller: 'StorageLocationListCtrl'
			}).
			when('/storagelocations/:storagelocationID', {
				templateUrl: 'partials/storagelocation-detail.html',
				controller: 'StorageLocationDetailCtrl'
			}).
			when('/assemblys', {
				templateUrl: 'partials/assembly-list.html',
				controller: 'AssemblyListCtrl'
			}).
			when('/assemblys/:assemblyID', {
				templateUrl: 'partials/assembly-detail.html',
				controller: 'AssemblyDetailCtrl'
			}).
			when('/tubetypes', {
				templateUrl: 'partials/tubetype-list.html',
				controller: 'TubeTypeListCtrl'
			}).
			when('/tubetypes/:tubetypeID', {
				templateUrl: 'partials/tubetype-detail.html',
				controller: 'TubeTypeDetailCtrl'
			}).
			when('/experimentalresults', {
				templateUrl: 'partials/experimentalresult-list.html',
				controller: 'ExperimentalResultListCtrl'
			}).
			when('/experimentalresults/:experimentalresultID', {
				templateUrl: 'partials/experimentalresult-detail.html',
				controller: 'ExperimentalResultDetailCtrl'
			}).
			when('/sequencingruns', {
				templateUrl: 'partials/sequencingrun-list.html',
				controller: 'SequencingRunListCtrl'
			}).
			when('/sequencingruns/:sequencingrunID', {
				templateUrl: 'partials/sequencingrun-detail.html',
				controller: 'SequencingRunDetailCtrl'
			}).
			when('/tubes', {
				templateUrl: 'partials/tube-list.html',
				controller: 'TubeListCtrl'
			}).
			when('/tubes/:tubeID', {
				templateUrl: 'partials/tube-detail.html',
				controller: 'TubeDetailCtrl'
			}).
			when('/sampletypes', {
				templateUrl: 'partials/sampletype-list.html',
				controller: 'SampleTypeListCtrl'
			}).
			when('/sampletypes/:sampletypeID', {
				templateUrl: 'partials/sampletype-detail.html',
				controller: 'SampleTypeDetailCtrl'
			}).
			when('/experiments', {
				templateUrl: 'partials/experiment-list.html',
				controller: 'ExperimentListCtrl'
			}).
			when('/experiments/:experimentID', {
				templateUrl: 'partials/experiment-detail.html',
				controller: 'ExperimentDetailCtrl'
			}).
			when('/phages', {
				templateUrl: 'partials/phage-list.html',
				controller: 'PhageListCtrl'
			}).
			when('/phages/:phageID', {
				templateUrl: 'partials/phage-detail.html',
				controller: 'PhageDetailCtrl'
			}).
			when('/phagednapreps', {
				templateUrl: 'partials/phagednaprep-list.html',
				controller: 'PhageDNAPrepListCtrl'
			}).
			when('/phagednapreps/:phagednaprepID', {
				templateUrl: 'partials/phagednaprep-detail.html',
				controller: 'PhageDNAPrepDetailCtrl'
			}).
			when('/sequencingrunpools', {
				templateUrl: 'partials/sequencingrunpool-list.html',
				controller: 'SequencingRunPoolListCtrl'
			}).
			when('/sequencingrunpools/:sequencingrunpoolID', {
				templateUrl: 'partials/sequencingrunpool-detail.html',
				controller: 'SequencingRunPoolDetailCtrl'
			}).
			when('/sequencingrunpoolitems', {
				templateUrl: 'partials/sequencingrunpoolitem-list.html',
				controller: 'SequencingRunPoolItemListCtrl'
			}).
			when('/sequencingrunpoolitems/:sequencingrunpoolitemID', {
				templateUrl: 'partials/sequencingrunpoolitem-detail.html',
				controller: 'SequencingRunPoolItemDetailCtrl'
			}).
			when('/containertypes', {
				templateUrl: 'partials/containertype-list.html',
				controller: 'ContainerTypeListCtrl'
			}).
			when('/containertypes/:containertypeID', {
				templateUrl: 'partials/containertype-detail.html',
				controller: 'ContainerTypeDetailCtrl'
			}).
			when('/environmentalsamples', {
				templateUrl: 'partials/environmentalsample-list.html',
				controller: 'EnvironmentalSampleListCtrl'
			}).
			when('/environmentalsamples/:environmentalsampleID', {
				templateUrl: 'partials/environmentalsample-detail.html',
				controller: 'EnvironmentalSampleDetailCtrl'
			}).
			when('/lysates', {
				templateUrl: 'partials/lysate-list.html',
				controller: 'LysateListCtrl'
			}).
			when('/lysates/:lysateID', {
				templateUrl: 'partials/lysate-detail.html',
				controller: 'LysateDetailCtrl'
			}).
			when('/bacteria', {
				templateUrl: 'partials/bacteria-list.html',
				controller: 'BacteriaListCtrl'
			}).
			when('/bacteria/:bacteriaID', {
				templateUrl: 'partials/bacteria-detail.html',
				controller: 'BacteriaDetailCtrl'
			}).
			when('/accounts', {
				templateUrl: 'partials/account-list.html',
				controller: 'AccountListCtrl'
			}).
			when('/accounts/:accountID', {
				templateUrl: 'partials/account-detail.html',
				controller: 'AccountDetailCtrl'
			}).
			when('/emailconfirmations', {
				templateUrl: 'partials/emailconfirmation-list.html',
				controller: 'EmailConfirmationListCtrl'
			}).
			when('/emailconfirmations/:emailconfirmationID', {
				templateUrl: 'partials/emailconfirmation-detail.html',
				controller: 'EmailConfirmationDetailCtrl'
			}).
			when('/signupcoderesults', {
				templateUrl: 'partials/signupcoderesult-list.html',
				controller: 'SignupCodeResultListCtrl'
			}).
			when('/signupcoderesults/:signupcoderesultID', {
				templateUrl: 'partials/signupcoderesult-detail.html',
				controller: 'SignupCodeResultDetailCtrl'
			}).
			when('/signupcodes', {
				templateUrl: 'partials/signupcode-list.html',
				controller: 'SignupCodeListCtrl'
			}).
			when('/signupcodes/:signupcodeID', {
				templateUrl: 'partials/signupcode-detail.html',
				controller: 'SignupCodeDetailCtrl'
			}).
			when('/emailaddresses', {
				templateUrl: 'partials/emailaddress-list.html',
				controller: 'EmailAddressListCtrl'
			}).
			when('/emailaddresses/:emailaddressID', {
				templateUrl: 'partials/emailaddress-detail.html',
				controller: 'EmailAddressDetailCtrl'
			}).
			when('/accountdeletions', {
				templateUrl: 'partials/accountdeletion-list.html',
				controller: 'AccountDeletionListCtrl'
			}).
			when('/accountdeletions/:accountdeletionID', {
				templateUrl: 'partials/accountdeletion-detail.html',
				controller: 'AccountDeletionDetailCtrl'
			}).
			when('/anonymousaccounts', {
				templateUrl: 'partials/anonymousaccount-list.html',
				controller: 'AnonymousAccountListCtrl'
			}).
			when('/anonymousaccounts/:anonymousaccountID', {
				templateUrl: 'partials/anonymousaccount-detail.html',
				controller: 'AnonymousAccountDetailCtrl'
			}).
// LOAD ROUTES
			when('/login', {
				templateUrl: 'partials/login.html',
				controller: 'LoginCtrl'
			}).
			when('/logout', {
				templateUrl: 'partials/login.html',
				controller: 'LogOutCtrl'
			}).
			when('/', {
				templateUrl: 'partials/home.html',
				controller: 'HomeCtrl'
			}).
			otherwise({
				redirectTo: '/'
			});

			//function loginRequired($q, $location, $localStorage) {
				//var deferred = $q.defer();
				//if ($localStorage.jwtToken) {
					//deferred.resolve();
				//} else {
					//$location.path('/login');
				//}
				//return deferred.promise;
			//};
		RestangularProvider.setBaseUrl(DRF_URL);
		RestangularProvider.setRequestSuffix('/');
		RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
			var extractedData;
			// .. to look for getList operations
			if (operation === "getList") {
			// .. and handle the data and meta data
				extractedData = data.results;
				extractedData.meta = {
					'count': data.count,
					'next': data.next,
					'previous': data.previous
				}
			} else {
				extractedData = data;
			}
			return extractedData;
		});

		$httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
			return {
			   'request': function (config) {
				   config.headers = config.headers || {};
				   if ($localStorage.jwtToken) {
					   config.headers.Authorization = 'JWT ' + $localStorage.jwtToken;
				   }
				   return config;
			   },
			   'responseError': function (response) {
				   console.log('Failed with', response.status, 'status');
				   if (response.status == 401 || response.status == 403 || response.status == 400 || response.status == 500) {
					   console.log('bad');
					   //$location.path('/login');
				   }
				   return $q.reject(response);
			   }
		   };
		}]);
}]);

require('./directives.js')(base);
require('./factory.js')(base);
require('./filter.js')(base);
require('./service.js')(base);
require('./const.js')(base);
require('./ctrl/home.js')(base);
require('./ctrl/nav.js')(base);
require('./ctrl/login.js')(base);
require('./ctrl/logout.js')(base);
require('./ctrl/bioproject/list.js')(base);
require('./ctrl/bioproject/detail.js')(base);
require('./ctrl/persontag/list.js')(base);
require('./ctrl/persontag/detail.js')(base);
require('./ctrl/organisation/list.js')(base);
require('./ctrl/organisation/detail.js')(base);
require('./ctrl/box/list.js')(base);
require('./ctrl/box/detail.js')(base);
require('./ctrl/storagelocation/list.js')(base);
require('./ctrl/storagelocation/detail.js')(base);
require('./ctrl/assembly/list.js')(base);
require('./ctrl/assembly/detail.js')(base);
require('./ctrl/tubetype/list.js')(base);
require('./ctrl/tubetype/detail.js')(base);
require('./ctrl/experimentalresult/list.js')(base);
require('./ctrl/experimentalresult/detail.js')(base);
require('./ctrl/sequencingrun/list.js')(base);
require('./ctrl/sequencingrun/detail.js')(base);
require('./ctrl/tube/list.js')(base);
require('./ctrl/tube/detail.js')(base);
require('./ctrl/sampletype/list.js')(base);
require('./ctrl/sampletype/detail.js')(base);
require('./ctrl/experiment/list.js')(base);
require('./ctrl/experiment/detail.js')(base);
require('./ctrl/phage/list.js')(base);
require('./ctrl/phage/detail.js')(base);
require('./ctrl/phagednaprep/list.js')(base);
require('./ctrl/phagednaprep/detail.js')(base);
require('./ctrl/sequencingrunpool/list.js')(base);
require('./ctrl/sequencingrunpool/detail.js')(base);
require('./ctrl/sequencingrunpoolitem/list.js')(base);
require('./ctrl/sequencingrunpoolitem/detail.js')(base);
require('./ctrl/containertype/list.js')(base);
require('./ctrl/containertype/detail.js')(base);
require('./ctrl/environmentalsample/list.js')(base);
require('./ctrl/environmentalsample/detail.js')(base);
require('./ctrl/lysate/list.js')(base);
require('./ctrl/lysate/detail.js')(base);
require('./ctrl/bacteria/list.js')(base);
require('./ctrl/bacteria/detail.js')(base);
require('./ctrl/account/list.js')(base);
require('./ctrl/account/detail.js')(base);
require('./ctrl/emailconfirmation/list.js')(base);
require('./ctrl/emailconfirmation/detail.js')(base);
require('./ctrl/signupcoderesult/list.js')(base);
require('./ctrl/signupcoderesult/detail.js')(base);
require('./ctrl/signupcode/list.js')(base);
require('./ctrl/signupcode/detail.js')(base);
require('./ctrl/emailaddress/list.js')(base);
require('./ctrl/emailaddress/detail.js')(base);
require('./ctrl/accountdeletion/list.js')(base);
require('./ctrl/accountdeletion/detail.js')(base);
require('./ctrl/anonymousaccount/list.js')(base);
require('./ctrl/anonymousaccount/detail.js')(base);
// REQUIRE
