(function(module) {
try { module = angular.module("weasleyNG.templates"); }
catch(err) { module = angular.module("weasleyNG.templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("foo/foo.tpl.html",
    "<div>foo</div>");
}]);
})();
