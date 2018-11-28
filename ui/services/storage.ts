module App.Services {

    export class StorageService {

        store(key: string, value: string) {
            return window.localStorage.setItem(key, JSON.stringify(value))
        }

        get(key: string) {
            var result = window.localStorage.getItem(key);
            return JSON.parse(result || 'null');
        }
    }

    App.module.service('_storage', StorageService);
}