module App.Controllers {

    class RegisterCtrl {

    }

    App.module.controller('RegisterCtrl', RegisterCtrl);

    class LoginCtrl {

        message: string;

        constructor() {
            this.message = 'Login';
        }

    }

    App.module.controller('LoginCtrl', LoginCtrl);

    class CompanyController {

        message: string;

        constructor() {
            this.message = 'CompanyController'
        }

    }
    

    module.controller('CompanyCtrl', CompanyController);

    class EmployeeCtrl {

        message: string;

        constructor() {
            this.message = 'EmployeeController'
        }


    }

    module.controller('EmployeeCtrl', EmployeeCtrl);

    class HomeCtrl {

        message: string;

        constructor() {
            this.message = 'Welcome'
        }

    }

    module.controller('HomeCtrl', HomeCtrl);
}