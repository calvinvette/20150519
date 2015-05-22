angular.module("weasleyNG")
 .controller("CustomerTableController", function($scope) {
                $scope.customers = [ ]; 
                $scope.$on("CustomerAddedEvent", function(evt, data) {
                        $scope.customers.push(data);
                });
        })
