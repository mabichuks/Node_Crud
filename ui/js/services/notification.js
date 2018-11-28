"use strict";
var App;
(function (App) {
    var Services;
    (function (Services) {
        var NotificationService = /** @class */ (function () {
            function NotificationService() {
                toastr.options.closeButton = true;
            }
            NotificationService.prototype.success = function (message, title) {
                console.log(message);
                var parsed = this.parse(message);
                if (title) {
                    toastr.success(parsed, title);
                }
                else {
                    toastr.success(parsed);
                }
            };
            NotificationService.prototype.error = function (message, title) {
                console.error(message);
                var parsed = this.parse(message);
                if (title) {
                    toastr.error(parsed, title);
                }
                else {
                    toastr.error(parsed);
                }
            };
            NotificationService.prototype.info = function (message, title) {
                console.info(message);
                var parsed = this.parse(message);
                if (title) {
                    toastr.info(parsed, title);
                }
                else {
                    toastr.info(parsed);
                }
            };
            NotificationService.prototype.warning = function (message, title) {
                console.warn(message);
                var parsed = this.parse(message);
                if (title) {
                    toastr.warning(parsed, title);
                }
                else {
                    toastr.warning(parsed);
                }
            };
            NotificationService.prototype.parse = function (message) {
                if (!message || message.length <= 0) {
                    return " &nbsp; ";
                }
                return message;
            };
            return NotificationService;
        }());
        Services.NotificationService = NotificationService;
        App.module.service("_notify", NotificationService);
    })(Services = App.Services || (App.Services = {}));
})(App || (App = {}));
