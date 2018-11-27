"use strict";
var App;
(function (App) {
    var Routes;
    (function (Routes) {
        var config = function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/login');
            $stateProvider
                .state('login', {
                url: '/login',
                templateUrl: '../templates/account/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'model'
            })
                .state('register', {
                url: '/register',
                templateUrl: '../templates/account/register.html',
                controller: 'RegisterCtrl',
                controllerAs: 'model'
            });
        };
        config.$inject = ['$stateProvider', '$urlRouterProvider'];
        App.module.config(config);
    })(Routes = App.Routes || (App.Routes = {}));
})(App || (App = {}));
