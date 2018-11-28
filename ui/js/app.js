"use strict";
var App;
(function (App) {
    App.module = angular.module("App", ["ngAnimate", "ui.router", "angular-loading-bar"]);
    App.module.run(function () {
        console.log('running');
    });
})(App || (App = {}));
