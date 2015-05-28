angular.module("weasleyNG")
.service("CustomerRestStorageService", function($rootScope, $http) {
	function getRESTCustomers() {
		// HTTP GET request retrieves back data =~ SELECT from SQL
		$http.get("http://www.nextgeneducation.com/weasley/customers.json")
			.success(function(data) {
				$rootScope.$broadcast("CustomerListResponseEvent", data);
			})
			.error(function(error, status, headers, config) {
				console.log("Error retrieving customers from server!");
				console.log(error);
				console.log(status);
			});
	};

	function saveRESTCustomers(customers) {
		console.log("POSTED customers...");
	};

	$rootScope.$on("CustomerUpdatedEvent", function(evt, data) {
		console.log("PUT customer: " + data);
	});

	$rootScope.$on("CustomerDeletedEvent", function(evt, data) {
		console.log("DELETE customer: " + data);
	});

	$rootScope.$on("CustomerRegisteredEvent", function(evt, data) {
		console.log("POST customer: " + data);
	});

	$rootScope.$on("CustomerListRequestEvent", function(evt) {
			getRESTCustomers();
	});
});
