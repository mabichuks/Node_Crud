module App.Routes {
    var config = function ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
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

    }

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    App.module.config(config);
}