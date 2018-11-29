module App.Routes {

    var config = function ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('employees', {
                url: '/employees',
                templateUrl: '../templates/employee/employees.html',
                controller: 'EmployeeCtrl',
                controllerAs: 'model'
            })
            .state('addEmployee', {
                url: '/addEmployee',
                templateUrl: '../templates/employee/addemployee.html',
                controller: 'EmployeeCtrl',
                controllerAs: 'model'
            })
            .state('companies', {
                url:'/companies',
                templateUrl: '../templates/company/companies.html',
                controller: 'CompanyCtrl',
                controllerAs: 'model'
            })
            .state('home', {
                url: '/',
                templateUrl: '../templates/home/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'model'
            });


    }

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    App.module.config(config);
}