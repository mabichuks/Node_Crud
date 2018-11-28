module App.Services {

    export class DataService {

        private notify: NotificationService;
        private http: ng.IHttpService;
        private Q: ng.IQService;

        constructor($q: ng.IQService, $http: ng.IHttpService, _notify: NotificationService) {
            this.Q = $q;
            this.http = $http;
            this.notify = _notify;
        }

        get<T>(url: string) {

            var defer = this.Q.defer<T>();
            var getData = this.http.get<T>(url);
            var notify = this.notify;

            //On Success
            getData.then((response) => {
                if(response) {
                    defer.resolve(response.data);
                }
            });

            //On Error
            getData.catch(error => {
                notify.error(error);
                defer.reject(error);
            });

            return defer.promise;
        }

        post<T>(url: string, data: {}):ng.IPromise<T> {

            var defer = this.Q.defer<T>();
            var postData = this.http.post<T>(url, data);
            var notify = this.notify;

            //on success
            postData.then(response => {
                if(response) {
                    defer.resolve(response.data);
                }
            });

            //on failure
            postData.catch(err => {
                notify.error(err);
                defer.reject(err);
            });

            return defer.promise;
        }

        put<T>(url: string, data: {}):ng.IPromise<T> {
            var defer = this.Q.defer<T>();
            var putData = this.http.put<T>(url, data);
            var notify = this.notify;

            putData.then(response => {
                if(response) {
                    defer.resolve(response.data);
                }
            });

            putData.catch(err => {
                notify.error(err);
                defer.reject(err);
            });

            return defer.promise;
        }

        delete<T>(url: string) {

            var defer = this.Q.defer<T>();
            var deleteData = this.http.delete<T>(url);
            var notify = this.notify;

            //on success
            deleteData.then(response => {
                if(response) {
                    defer.resolve(response.data);
                }
            });

            //on failure
            deleteData.catch(err => {
                notify.error(err);
                defer.reject(err);
            });

            return defer.promise;
        } 
    }

    App.module.service('_data', DataService);
}