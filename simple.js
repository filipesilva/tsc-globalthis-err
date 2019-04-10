(function () {
  'use strict';

  var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

  function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  var ResourceLoader = /** @class */ (function () {
    function ResourceLoader() {
    }
    ResourceLoader.prototype.get = function (url) { return ''; };
    return ResourceLoader;
  }());

  var CachedResourceLoader = /** @class */ (function (_super) {
    __extends(CachedResourceLoader, _super);
    function CachedResourceLoader() {
      var _this = _super.call(this) || this;
      _this._cache = _global.$templateCache; // tsc-globalthis-err: this is the line that causes the error.
      if (_this._cache == null) {
        throw new Error('CachedResourceLoader: Template cache was not found in $templateCache.');
      }
      return _this;
    }
    CachedResourceLoader.prototype.get = function (url) {
      if (this._cache.hasOwnProperty(url)) {
        return Promise.resolve(this._cache[url]);
      }
      else {
        return Promise.reject('CachedResourceLoader: Did not find cached template for ' + url);
      }
    };
    return CachedResourceLoader;
  }(ResourceLoader));

  console.log(CachedResourceLoader)
}());
