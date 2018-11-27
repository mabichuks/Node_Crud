module App.Routes {
    var config = function ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '../templates/home/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'model'
            });

    }

    module.config(config);
}