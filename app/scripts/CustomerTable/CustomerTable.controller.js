angular.module("weasleyNG")
 .controller("CustomerTableController", function($scope, $rootScope) {
                $scope.customers = [ ]; 
                $scope.$on("CustomerAddedEvent", function(evt, data) {
                        $scope.customers.push(data);
                });

		$rootScope.$on("CustomerListResponseEvent", function(evt, data) {
			$scope.customers = data;
		});

		$rootScope.$broadcast("CustomerListRequestEvent");
        })
