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
                this.message = 'Login';
            }
            return LoginCtrl;
        }());
        App.module.controller('LoginCtrl', LoginCtrl);
        var CompanyController = /** @class */ (function () {
            function CompanyController() {
                this.message = 'CompanyController';
            }
            return CompanyController;
        }());
        App.module.controller('CompanyCtrl', CompanyController);
        var EmployeeCtrl = /** @class */ (function () {
            function EmployeeCtrl() {
                this.message = 'EmployeeController';
            }
            return EmployeeCtrl;
        }());
        App.module.controller('EmployeeCtrl', EmployeeCtrl);
        var HomeCtrl = /** @class */ (function () {
            function HomeCtrl() {
                this.message = 'Welcome';
            }
            return HomeCtrl;
        }());
        App.module.controller('HomeCtrl', HomeCtrl);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
