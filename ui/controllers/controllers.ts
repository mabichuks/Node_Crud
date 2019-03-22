module App.Controllers {

    class RegisterCtrl {

        http: ng.IHttpService;
        notify: Services.NotificationService;
        storage: Services.StorageService;
        state: ng.ui.IStateService;

        constructor($http, _notify, _storage, $state) {

            this.notify = _notify;
            this.http = $http;
            this.storage = _storage;
            this.state = $state;
        }

        register(user: UserRegister) {
            
            if(user.password.localeCompare(user.confirmPassword) != 0) {
                toastr.info('Passwords do not match');
                return;
            }

            this.http.post('/api/v1/auth/register', user).then(response => {

                if(response.status === 201) {
                    this.notify.success('Successfully Registered');
                    setTimeout(() => {this.state.go('login');}, 4000)
                }
            })
            .catch(error => {
                this.notify.error(JSON.stringify(error.data.errors));
            })
        }


    }

    App.module.controller('RegisterCtrl', RegisterCtrl);

    class LoginCtrl {

        http: ng.IHttpService;
        notify: Services.NotificationService;
        storage: Services.StorageService;
        state: ng.ui.IStateService;

        constructor($http, _notify, _storage, $state) {

            this.http = $http;
            this.notify = _notify;
            this.state = $state;
            this.storage = _storage;
        }

        login(user: UserLogin) {

            this.http.post('/api/v1/auth/signin', user)
                .then(response => {
                    if(response) {
                        var {token} = response.data;
                        this.notify.success('successfully logged in');
                        this.storage.store('token', token);

                        setTimeout(() => {  window.location.href = '/';}, 1000)


                    }
                })
                .catch(error => {
                    this.notify.error(JSON.stringify(error.data.message));
                })

        }


    }

    App.module.controller('LoginCtrl', LoginCtrl);


    class CompanyCtrl {

        private COMPANY_URL: string ='/api/v1/company';
        companies: Company[] = [];
        index: number = 0;

        storage: Services.StorageService;
        state: ng.ui.IStateService;
        notify: Services.NotificationService;
        data: Services.DataService;
        modal: ng.ui.bootstrap.IModalService;
        constructor($state, $modal, _notify, _data, _storage) {

            this.state = $state;
            this.storage = _storage;
            this.notify = _notify;
            this.data = _data;
            this.modal = $modal;
        }

        getAll() {

            var token = this.storage.get('token');
            var config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            this.data.get<Company[]>(this.COMPANY_URL, config)
                .then(result => {
                    this.companies = result.result;
                    console.log(this.companies);
                    this.index = this.companies.length;
                })
                .catch(error => {
                    this.notify.error(error.data.message);
                    window.location.href = '/account';
                })
        }

        add() {
            var $modalInstance = this.modal.open({
                controller: 'AddCompanyCtrl as model',
                templateUrl: 'company.html',
                resolve: {

                }
            });

            $modalInstance.result.then(() => this.getAll());
        }

        edit(company: Company) {
            console.log(company);
            var $modalInstance = this.modal.open({
                controller: 'EditCompanyCtrl as model',
                templateUrl: "editcompany.html",
                resolve: {

                    company: ()=> {
                        return angular.copy(company);
                    }
                }
            });

            $modalInstance.result.then(() => this.getAll() );
        }

        delete(id: number) {
            var token = this.storage.get('token');
            var config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            var confirm = window.confirm('Are you sure you want to delete');
            if(!confirm) {this.notify.info('Not deleted'); return;}

            this.data.delete<Company>(`${this.COMPANY_URL}/delete/${id}`, config)
                .then(result => {
                    this.notify.success('Successfully deleted');
                    window.location.reload();
                })
                .catch(error => {
                    this.notify.error(error.message);
                });

        }


    }
    

    module.controller('CompanyCtrl', CompanyCtrl);

    class AddCompanyCtrl {

        private COMPANY_URL: string ='/api/v1/company';

        company!: Company;
        notify: Services.NotificationService;
        modalInstance: ng.ui.bootstrap.IModalServiceInstance;
        data: Services.DataService;
        storage: Services.StorageService;

        constructor($modalInstance, _notify, _data, _storage) {
            this.notify = _notify;
            this.modalInstance = $modalInstance;
            this.data = _data;
            this.storage = _storage;
        }



        ok(company: Company) {

            var token = this.storage.get('token');
            var config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            if(!company) {
                this.notify.error('Fields are required');
                return;
            }

            if(!company.name) {
                this.notify.error('Company name required');

            }

            this.data.post<Company>(`${this.COMPANY_URL}/add`,company, config)
                .then(b => this.modalInstance.close(b))
                .catch(error => {
                    this.notify.error(error.data.message);
                });
        }

        cancel() {
            this.modalInstance.dismiss('Cancelled');
        }

    }

    module.controller('AddCompanyCtrl', AddCompanyCtrl);

    class EditCompanyCtrl {
        private COMPANY_URL: string ='/api/v1/company';

        company: Company;
        notify: Services.NotificationService;
        modalInstance: ng.ui.bootstrap.IModalServiceInstance;
        data: Services.DataService;
        storage: Services.StorageService;

        constructor($modalInstance, _notify, _data, _storage, company) {
            this.notify = _notify;
            this.modalInstance = $modalInstance;
            this.data = _data;
            this.storage = _storage;
            this.company = company;
        }



        ok(company: Company) {

            var token = this.storage.get('token');
            var config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            if(!company) {
                this.notify.error('Fields are required');
                return;
            }

            if(!company.name) {
                this.notify.error('Company name required');

            }

            this.data.put<Company>(`${this.COMPANY_URL}/update/${company.id}`,company, config)
                .then(b => this.modalInstance.close(b))
                .catch(error => {
                    this.notify.error(error.data.message);
                });
        }

        cancel() {
            this.modalInstance.dismiss('Cancelled');
        }
    }

    module.controller('EditCompanyCtrl', EditCompanyCtrl);


    

    class EmployeeCtrl {
        private EMPLOYEE_URL: string ='/api/v1/employee';
        employees: Employee[] = [];

        storage: Services.StorageService;
        state: ng.ui.IStateService;
        notify: Services.NotificationService;
        data: Services.DataService;
        constructor($state, _notify, _data, _storage) {

            this.state = $state;
            this.storage = _storage;
            this.notify = _notify;
            this.data = _data;
        }

        getAll() {

            var token = this.storage.get('token');
            var config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            this.data.get<Employee[]>(this.EMPLOYEE_URL, config)
                .then(result => {
                    this.employees = result.result;
                })
                .catch(error => {
                    this.notify.error(error.data.message);
                    window.location.href = '/account';
                });
                
        }



    }

    module.controller('EmployeeCtrl', EmployeeCtrl);

    class HomeCtrl {

        private EMPLOYEE_URL: string ='/api/v1/employee';
        private COMPANY_URL: string ='/api/v1/company';

        employeeCount:number = 0
        companyCount: number = 0

        Companies: Company[] = [];
        employees: Employee[] = [];
        storage: Services.StorageService;
        http: ng.IHttpService;
        state: ng.ui.IStateService;
        notify: Services.NotificationService;
        data: Services.DataService;


        constructor($http, $state, _storage, _notify, _data) {
            this.storage = _storage;
            this.http = $http;
            this.state = $state;
            this.notify = _notify
            this.data = _data;

        }


        getCount() {
            var token = this.storage.get('token');
            var config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            this.data.get<Employee[]>(this.EMPLOYEE_URL, config)
                .then(result => {
                    this.employees = result.result;
                    this.employeeCount = this.employees.length;

                });
            this.data.get<Company[]>(this.COMPANY_URL, config)
                .then(result => {
                    this.Companies = result.result;

                    this.companyCount = this.Companies.length;

                });
        } 

        company() {

            this.state.go('companies');
        }

        employee() {
            this.state.go('employees');
        }

    }

    module.controller('HomeCtrl', HomeCtrl);
}