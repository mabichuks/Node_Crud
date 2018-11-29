module App {
    export var module = angular.module("App", ["ngAnimate", "ui.router","ui.bootstrap", "angular-loading-bar"]);

    module.run(()=>{
        console.log('running');
    })
}

interface Operation<T> {
    result: T;
    succeeded: boolean;
    message: string;
}