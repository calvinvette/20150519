angular.module("weasleyNG")
        .controller("CustomerFormController", function($scope) {
		console.log("In CustomerFormController");
                $scope.customer = new Customer();
                $scope.register = function() {
                        $scope.$emit("CustomerRegisteredEvent", $scope.customer);
			console.log("Customer Registered!" + $scope.customer);
                        $scope.customer = new Customer();
                };
        });
