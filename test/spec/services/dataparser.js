'use strict';

describe('Service: DataParser', function () {

  // load the service's module
  beforeEach(module('cabinetWebAppApp'));

  // instantiate service
  var DataParser;
  beforeEach(inject(function (_DataParser_) {
    DataParser = _DataParser_;
  }));

  it('should do something', function () {
    expect(!!DataParser).toBe(true);
  });

});
