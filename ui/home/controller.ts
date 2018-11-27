module App.HomeCtrl {

    class HomeCtrl {

        message: string;

        constructor() {
            this.message = 'Welcome'
        }

    }

    module.controller('HomeCtrl', HomeCtrl);
}