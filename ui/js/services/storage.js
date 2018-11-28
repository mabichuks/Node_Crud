"use strict";
var App;
(function (App) {
    var Services;
    (function (Services) {
        var StorageService = /** @class */ (function () {
            function StorageService() {
            }
            StorageService.prototype.store = function (key, value) {
                return window.localStorage.setItem(key, JSON.stringify(value));
            };
            StorageService.prototype.get = function (key) {
                var result = window.localStorage.getItem(key);
                return JSON.parse(result || 'null');
            };
            return StorageService;
        }());
        Services.StorageService = StorageService;
        App.module.service('_storage', StorageService);
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
