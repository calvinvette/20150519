// ---SPECS-------------------------

describe('weasleyNG', function () {
  var scope,
    controller;
  
  beforeEach(function () {
    module('weasleyNG');
  });

  describe('WeasleyNGController', function () {
    beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      controller = $controller('WeasleyNGController', {
        '$scope': scope
      });
    }));
        
    it('sets the name', function () {
      scope.fooBar();
      expect(scope.foo).toBe('bar');
    });
  });
    
});
