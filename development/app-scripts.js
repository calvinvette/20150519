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
});


angular.module("weasleyNG.config", [])

.constant("ENV", {})

;
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
var Customer = function(customerId, firstName, lastName, phoneNumber) {
	this.customerId = customerId || -1;
	this.firstName = firstName || "";
	this.lastName = lastName || "";
	this.phoneNumber = phoneNumber || "";
};

Customer.prototype.getCustomerId = function() {
	return this.customerId;
};
Customer.prototype.setCustomerId = function(customerId) {
	this.customerId = customerId;
};

Customer.prototype.getFirstName = function() {
	return this.firstName;
};
Customer.prototype.setFirstName = function(firstName) {
	this.firstName = firstName;
};

Customer.prototype.getLastName = function() {
	return this.lastName;
};
Customer.prototype.setLastName = function(lastName) {
	this.lastName = lastName;
};

Customer.prototype.getPhoneNumber = function() {
	return this.phoneNumber;
};
Customer.prototype.setPhoneNumber = function(phoneNumber) {
	this.phoneNumber = phoneNumber;
};


Customer.prototype.toString = function() {
	return "Customer #" + this.customerId
			+ " " + this.firstName + " " + this.lastName;
};

angular.module("weasleyNG")
.service("CustomerStorageService", function($rootScope) {
	function getWLSCustomers() {
		var wlsCustomers = window.localStorage.getItem("customers");
		if (wlsCustomers) {
			var objCustomers = JSON.parse(wlsCustomers);
			var customers = [];
			$.each(objCustomers, function(idx, cust) {
				customers.push(angular.extend(new Customer(), cust));
			});
			return customers;
		} else {
			return [];
		}
	};

	function saveWLSCustomers(customers) {
		window.localStorage.setItem("customers", JSON.stringify(customers));
	};

	$rootScope.$on("CustomerUpdatedEvent", function(evt, data) {
		var customers = getWLSCustomers();
		var foundCust = _.find(customers, function(cust) {
			return cust.customerId == data.customerId;
		});
		//foundCust = data;
		angular.extend(foundCust, data);
		saveWLSCustomers(customers);
	});

	$rootScope.$on("CustomerDeletedEvent", function(evt, data) {
		var customers = getWLSCustomers();
		//customers = _.without(customers, data);
		customers = _.reject(customers, function(cust) {
			return cust.customerId == data.customerId;
		});
		saveWLSCustomers(customers);
	});

	$rootScope.$on("CustomerRegisteredEvent", function(evt, data) {
		var customers = getWLSCustomers();
		customers.push(data);
		saveWLSCustomers(customers);
	});

	$rootScope.$on("CustomerListRequestEvent", function(evt) {
		$rootScope.$broadcast("CustomerListResponseEvent", getWLSCustomers());
	});
});
