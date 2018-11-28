module App.Services {

    export class NotificationService {

        constructor(){
            toastr.options.closeButton = true;
        }

        success(message: string, title?: string) {
            console.log(message);
            var parsed = this.parse(message);
            if (title) {
                toastr.success(parsed, title);
            }
            else {
                toastr.success(parsed);
            }
        }
        error(message: string, title?: string) {
            console.error(message);
            var parsed = this.parse(message);
            if (title) {
                toastr.error(parsed, title);
            }
            else {
                toastr.error(parsed);
            }
        }
        info(message: string, title?: string) {
            console.info(message);
            var parsed = this.parse(message);
            if (title) {
                toastr.info(parsed, title);
            }
            else {
                toastr.info(parsed);
            }
        }
        warning(message: string, title?: string) {
            console.warn(message);
            var parsed = this.parse(message);
            if (title) {
                toastr.warning(parsed, title);
            }
            else {
                toastr.warning(parsed);
            }
        }

        parse(message: string) {
            if (!message || message.length <= 0) {
                return " &nbsp; ";
            }
            return message;
        }
    }
    App.module.service("_notify", NotificationService);
}