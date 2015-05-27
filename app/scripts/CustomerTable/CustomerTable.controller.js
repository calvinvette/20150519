angular.module("weasleyNG")
 .controller("CustomerTableController", function($scope, $rootScope) {
                $scope.customers = [ ]; 
		$scope.workingCustomer = new Customer();

                $scope.$on("CustomerAddedEvent", function(evt, data) {
                        $scope.customers.push(data);
                });

		$rootScope.$on("CustomerListResponseEvent", function(evt, data) {
			$scope.customers = data;
		});

		$rootScope.$broadcast("CustomerListRequestEvent");

		$scope.editCustomer = function(cust) {
			angular.copy(cust, $scope.workingCustomer);
		};

		$scope.isEditing = function(cust) {
			return cust.customerId == $scope.workingCustomer.customerId;
		};

		$scope.saveEdit = function(cust) {
			angular.copy($scope.workingCustomer, cust);
			$rootScope.$broadcast("CustomerUpdatedEvent", cust);
		};

		$scope.revertEdit = function() {
			$scope.workingCustomer = new Customer();
		};

		$scope.keyup = function(cust, evt) {
			switch(evt.which) {
				case 13: // Enter key was pressed - save
					$scope.saveEdit(cust);
					$scope.workingCustomer = new Customer();
					break;
				case 27: // Escape key was pressed - revert
					$scope.revertEdit();
					break;
			};
		};

		$scope.remove = function(cust) {
			$scope.customers = _.without($scope.customers, cust);
			$rootScope.$broadcast("CustomerDeletedEvent", cust);
		};
        });
