angular.module("weasleyNG")
.service("CustomerStorageService", function($rootScope) {
	function getWLSCustomers() {
		var wlsCustomers = window.localStorage.getItem("customers");
		if (wlsCustomers) {
			return JSON.parse(wlsCustomers);
		} else {
			return [];
		}
	};

	$rootScope.$on("CustomerRegisteredEvent", function(evt, data) {
		var customers = getWLSCustomers();
		customers.push(data);
		window.localStorage.setItem("customers", JSON.stringify(customers));
	});

	$rootScope.$on("CustomerListRequestEvent", function(evt) {
		$rootScope.$broadcast("CustomerListResponseEvent", getWLSCustomers());
	});
});
