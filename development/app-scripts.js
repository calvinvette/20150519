angular.module('weasleyNG', [
  
  'ngCookies',
  'ngAnimate',
  'weasleyNG.templates',
  'weasleyNG.config',
  'weasleyNG.foo'
])
.config(function ($locationProvider, $httpProvider) {

}) 
.run(function($timeout, $rootScope, $location){
  console.log('Your angular app is initialized.  Happy hacking!')
})


angular.module("weasleyNG.config", [])

.constant("ENV", {})

;
angular.module('weasleyNG.foo', [

])
.config(function ($locationProvider, $httpProvider) {

})

.controller('WeasleyNGController', function($scope) {
  $scope.foo;
  $scope.fooBar = function(){
    $scope.foo = 'bar';
  }
})  