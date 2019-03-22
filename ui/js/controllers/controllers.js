"use strict";
var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var RegisterCtrl = /** @class */ (function () {
            function RegisterCtrl($http, _notify, _storage, $state) {
                this.notify = _notify;
                this.http = $http;
                this.storage = _storage;
                this.state = $state;
            }
            RegisterCtrl.prototype.register = function (user) {
                var _this = this;
                if (user.password.localeCompare(user.confirmPassword) != 0) {
                    toastr.info('Passwords do not match');
                    return;
                }
                this.http.post('/api/v1/auth/register', user).then(function (response) {
                    if (response.status === 201) {
                        _this.notify.success('Successfully Registered');
                        setTimeout(function () { _this.state.go('login'); }, 4000);
                    }
                })
                    .catch(function (error) {
                    _this.notify.error(JSON.stringify(error.data.errors));
                });
            };
            return RegisterCtrl;
        }());
        App.module.controller('RegisterCtrl', RegisterCtrl);
        var LoginCtrl = /** @class */ (function () {
            function LoginCtrl($http, _notify, _storage, $state) {
                this.http = $http;
                this.notify = _notify;
                this.state = $state;
                this.storage = _storage;
            }
            LoginCtrl.prototype.login = function (user) {
                var _this = this;
                this.http.post('/api/v1/auth/signin', user)
                    .then(function (response) {
                    if (response) {
                        var token = response.data.token;
                        _this.notify.success('successfully logged in');
                        _this.storage.store('token', token);
                        setTimeout(function () { window.location.href = '/'; }, 1000);
                    }
                })
                    .catch(function (error) {
                    _this.notify.error(JSON.stringify(error.data.message));
                });
            };
            return LoginCtrl;
        }());
        App.module.controller('LoginCtrl', LoginCtrl);
        var CompanyCtrl = /** @class */ (function () {
            function CompanyCtrl($state, $modal, _notify, _data, _storage) {
                this.COMPANY_URL = '/api/v1/company';
                this.companies = [];
                this.index = 0;
                this.state = $state;
                this.storage = _storage;
                this.notify = _notify;
                this.data = _data;
                this.modal = $modal;
            }
            CompanyCtrl.prototype.getAll = function () {
                var _this = this;
                var token = this.storage.get('token');
                var config = {
                    headers: {
                        'Authorization': "Bearer " + token
                    }
                };
                this.data.get(this.COMPANY_URL, config)
                    .then(function (result) {
                    _this.companies = result.result;
                    console.log(_this.companies);
                    _this.index = _this.companies.length;
                })
                    .catch(function (error) {
                    _this.notify.error(error.data.message);
                    window.location.href = '/account';
                });
            };
            CompanyCtrl.prototype.add = function () {
                var _this = this;
                var $modalInstance = this.modal.open({
                    controller: 'AddCompanyCtrl as model',
                    templateUrl: 'company.html',
                    resolve: {}
                });
                $modalInstance.result.then(function () { return _this.getAll(); });
            };
            CompanyCtrl.prototype.edit = function (company) {
                var _this = this;
                console.log(company);
                var $modalInstance = this.modal.open({
                    controller: 'EditCompanyCtrl as model',
                    templateUrl: "editcompany.html",
                    resolve: {
                        company: function () {
                            return angular.copy(company);
                        }
                    }
                });
                $modalInstance.result.then(function () { return _this.getAll(); });
            };
            CompanyCtrl.prototype.delete = function (id) {
                var _this = this;
                var token = this.storage.get('token');
                var config = {
                    headers: {
                        'Authorization': "Bearer " + token
                    }
                };
                var confirm = window.confirm('Are you sure you want to delete');
                if (!confirm) {
                    this.notify.info('Not deleted');
                    return;
                }
                this.data.delete(this.COMPANY_URL + "/delete/" + id, config)
                    .then(function (result) {
                    _this.notify.success('Successfully deleted');
                    window.location.reload();
                })
                    .catch(function (error) {
                    _this.notify.error(error.message);
                });
            };
            return CompanyCtrl;
        }());
        App.module.controller('CompanyCtrl', CompanyCtrl);
        var AddCompanyCtrl = /** @class */ (function () {
            function AddCompanyCtrl($modalInstance, _notify, _data, _storage) {
                this.COMPANY_URL = '/api/v1/company';
                this.notify = _notify;
                this.modalInstance = $modalInstance;
                this.data = _data;
                this.storage = _storage;
            }
            AddCompanyCtrl.prototype.ok = function (company) {
                var _this = this;
                var token = this.storage.get('token');
                var config = {
                    headers: {
                        'Authorization': "Bearer " + token
                    }
                };
                if (!company) {
                    this.notify.error('Fields are required');
                    return;
                }
                if (!company.name) {
                    this.notify.error('Company name required');
                }
                this.data.post(this.COMPANY_URL + "/add", company, config)
                    .then(function (b) { return _this.modalInstance.close(b); })
                    .catch(function (error) {
                    _this.notify.error(error.data.message);
                });
            };
            AddCompanyCtrl.prototype.cancel = function () {
                this.modalInstance.dismiss('Cancelled');
            };
            return AddCompanyCtrl;
        }());
        App.module.controller('AddCompanyCtrl', AddCompanyCtrl);
        var EditCompanyCtrl = /** @class */ (function () {
            function EditCompanyCtrl($modalInstance, _notify, _data, _storage, company) {
                this.COMPANY_URL = '/api/v1/company';
                this.notify = _notify;
                this.modalInstance = $modalInstance;
                this.data = _data;
                this.storage = _storage;
                this.company = company;
            }
            EditCompanyCtrl.prototype.ok = function (company) {
                var _this = this;
                var token = this.storage.get('token');
                var config = {
                    headers: {
                        'Authorization': "Bearer " + token
                    }
                };
                if (!company) {
                    this.notify.error('Fields are required');
                    return;
                }
                if (!company.name) {
                    this.notify.error('Company name required');
                }
                this.data.put(this.COMPANY_URL + "/update/" + company.id, company, config)
                    .then(function (b) { return _this.modalInstance.close(b); })
                    .catch(function (error) {
                    _this.notify.error(error.data.message);
                });
            };
            EditCompanyCtrl.prototype.cancel = function () {
                this.modalInstance.dismiss('Cancelled');
            };
            return EditCompanyCtrl;
        }());
        App.module.controller('EditCompanyCtrl', EditCompanyCtrl);
        var EmployeeCtrl = /** @class */ (function () {
            function EmployeeCtrl($state, _notify, _data, _storage) {
                this.EMPLOYEE_URL = '/api/v1/employee';
                this.employees = [];
                this.state = $state;
                this.storage = _storage;
                this.notify = _notify;
                this.data = _data;
            }
            EmployeeCtrl.prototype.getAll = function () {
                var _this = this;
                var token = this.storage.get('token');
                var config = {
                    headers: {
                        'Authorization': "Bearer " + token
                    }
                };
                this.data.get(this.EMPLOYEE_URL, config)
                    .then(function (result) {
                    _this.employees = result.result;
                })
                    .catch(function (error) {
                    _this.notify.error(error.data.message);
                    window.location.href = '/account';
                });
            };
            return EmployeeCtrl;
        }());
        App.module.controller('EmployeeCtrl', EmployeeCtrl);
        var HomeCtrl = /** @class */ (function () {
            function HomeCtrl($http, $state, _storage, _notify, _data) {
                this.EMPLOYEE_URL = '/api/v1/employee';
                this.COMPANY_URL = '/api/v1/company';
                this.employeeCount = 0;
                this.companyCount = 0;
                this.Companies = [];
                this.employees = [];
                this.storage = _storage;
                this.http = $http;
                this.state = $state;
                this.notify = _notify;
                this.data = _data;
            }
            HomeCtrl.prototype.getCount = function () {
                var _this = this;
                var token = this.storage.get('token');
                var config = {
                    headers: {
                        'Authorization': "Bearer " + token
                    }
                };
                this.data.get(this.EMPLOYEE_URL, config)
                    .then(function (result) {
                    _this.employees = result.result;
                    _this.employeeCount = _this.employees.length;
                });
                this.data.get(this.COMPANY_URL, config)
                    .then(function (result) {
                    _this.Companies = result.result;
                    _this.companyCount = _this.Companies.length;
                });
            };
            HomeCtrl.prototype.company = function () {
                this.state.go('companies');
            };
            HomeCtrl.prototype.employee = function () {
                this.state.go('employees');
            };
            return HomeCtrl;
        }());
        App.module.controller('HomeCtrl', HomeCtrl);
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
