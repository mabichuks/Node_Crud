"use strict";
var App;
(function (App) {
    var Routes;
    (function (Routes) {
        var config = function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('home', {
                url: '/',
                templateUrl: '../templates/home/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'model'
            });
        };
        App.module.config(config);
    })(Routes = App.Routes || (App.Routes = {}));
})(App || (App = {}));
