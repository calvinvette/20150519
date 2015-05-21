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

