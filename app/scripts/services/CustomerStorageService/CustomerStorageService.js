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
			return cust.customerId = data.customerId;
		});
		foundCust = data;
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
