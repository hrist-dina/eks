import $ from "jquery";
import Validator from "./Validator";
import {Form} from "./Form";

export class StudentProfileForm extends Form {
    init() {
        this.$form = $(this.form);

        this.profileName = this.$form.find('.modal__person-name span');
        this.profileMail = this.$form.find('.modal__person-value span');

        this.successMessage = this.$form.find('.js-modal-success');
        this.errorMessage = this.$form.find('.js-modal-error');

        this.onSubmit();
    }

    onSubmit() {
        this.$form.on("submit", (e) => {
            e.preventDefault();
            let validator = new Validator(this.$form);

            e.preventDefault();
            let data = this.$form.serializeArray();
            let file = this.$form.find('.js-student-picture');
            let self = this;
            if (file.length) {
                let files = file.prop('files');
                let fileValue = files[0] != null ? files[0].name : undefined;
                let fileName = file.prop('name') != null ? file.prop('name') : undefined;

                if (fileValue && fileName) data.push({name: fileName, value: fileValue});
            }

            if (!validator.init()) {
                $(document).trigger("preloader.open");
                $.ajax({
                    url: this.$form.attr('action'),
                    method: "post",
                    data,

                    success: function (response) {
                        $(document).trigger("preloader.close");
                        let parsedResponse = JSON.parse(response);
                        if (parsedResponse.success && parsedResponse.data && parsedResponse.message) {
                            self.renderSuccessMessage(parsedResponse.message);
                            self.renderErrorMessage('');
                            self.renderProfileName(parsedResponse.data.fio);
                            self.renderProfileMail(parsedResponse.data.email);
                        } else if (!response.success && parsedResponse.data) {
                            self.renderErrorMessage(parsedResponse.message);
                            self.renderSuccessMessage('');
                        }
                    }
                });

                return false;
            }
        });
    }

    renderSuccessMessage(message) {
        if (message === undefined) return false;

        this.successMessage.html();
        this.successMessage.html(message);
    }

    renderErrorMessage(message) {
        if (message === undefined) return false;

        this.errorMessage.html();
        this.errorMessage.html(message);
    }

    renderProfileName(profileName) {
        if (profileName === undefined) return false;

        if (this.profileName != profileName) this.profileName.html(profileName);

    }

    renderProfileMail(profileMail) {
        if (profileMail === undefined) return false;

        if (this.profileMail != profileMail) this.profileMail.html(profileMail);

    }
}
