"use strict";
var App;
(function (App) {
    var Services;
    (function (Services) {
        var DataService = /** @class */ (function () {
            function DataService($q, $http, _notify) {
                this.Q = $q;
                this.http = $http;
                this.notify = _notify;
            }
            DataService.prototype.get = function (url, config) {
                var defer = this.Q.defer();
                var getData = this.http.get(url, config);
                var notify = this.notify;
                //On Success
                getData.then(function (response) {
                    if (response) {
                        defer.resolve(response.data);
                    }
                });
                //On Error
                getData.catch(function (error) {
                    notify.error(error);
                    defer.reject(error);
                });
                return defer.promise;
            };
            DataService.prototype.post = function (url, data, config) {
                var defer = this.Q.defer();
                var postData = this.http.post(url, data, config);
                var notify = this.notify;
                //on success
                postData.then(function (response) {
                    if (response) {
                        defer.resolve(response.data);
                    }
                });
                //on failure
                postData.catch(function (err) {
                    notify.error(err);
                    defer.reject(err);
                });
                return defer.promise;
            };
            DataService.prototype.put = function (url, data, config) {
                var defer = this.Q.defer();
                var putData = this.http.put(url, data, config);
                var notify = this.notify;
                putData.then(function (response) {
                    if (response) {
                        defer.resolve(response.data);
                    }
                });
                putData.catch(function (err) {
                    notify.error(err);
                    defer.reject(err);
                });
                return defer.promise;
            };
            DataService.prototype.delete = function (url, config) {
                var defer = this.Q.defer();
                var deleteData = this.http.delete(url, config);
                var notify = this.notify;
                //on success
                deleteData.then(function (response) {
                    if (response) {
                        defer.resolve(response.data);
                    }
                });
                //on failure
                deleteData.catch(function (err) {
                    notify.error(err);
                    defer.reject(err);
                });
                return defer.promise;
            };
            return DataService;
        }());
        Services.DataService = DataService;
        App.module.service('_data', DataService);
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
