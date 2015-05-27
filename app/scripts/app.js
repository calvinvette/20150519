angular.module('weasleyNG', [
  'ngRoute',
  'ngCookies',
  'ngAnimate',
  'weasleyNG.templates',
  'weasleyNG.config',
  'weasleyNG.foo'
])
/*
.config(function ($locationProvider, $httpProvider, $routeProvider) {
*/
.config(function ($routeProvider) {
	console.log("Setting up route");
	$routeProvider
                        .when('/CustomerRegistration', {
                                templateUrl : 'scripts/CustomerForm/CustomerForm.html',
                                controller : 'CustomerFormController'
                        })
                        .when('/Customers', {
                                templateUrl : 'scripts/CustomerTable/CustomerTable.html',
                        })
			.otherwise({
				redirectTo: "404.html"
			});
}) 
//.run(function($timeout, $rootScope, $location){
.run(function($rootScope, CustomerStorageService){
  console.log('Your angular app is initialized.  Happy hacking!');
 $rootScope.$on("CustomerRegisteredEvent", function(evt, data) {
                        console.log("Customer Registered: " + data);
                        $rootScope.$broadcast("CustomerAddedEvent", data);
                });
})
;

