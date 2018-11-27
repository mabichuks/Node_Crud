"use strict";
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var RegisterCtrl = /** @class */ (function () {
            function RegisterCtrl() {
            }
            return RegisterCtrl;
        }());
        App.module.controller('RegisterCtrl', RegisterCtrl);
        var LoginCtrl = /** @class */ (function () {
            function LoginCtrl() {
            }
            return LoginCtrl;
        }());
        App.module.controller('LoginCtrl', LoginCtrl);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
