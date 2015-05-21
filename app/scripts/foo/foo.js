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