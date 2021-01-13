import $ from "jquery";
import Validator from "./Validator";
import {Form} from "./Form";

export class StudentProfileForm extends Form {
    init() {
        this.$form = $(this.form);

        this.profileName = this.$form.find('.modal__person-name span');
        this.profileMail = this.$form.find('.modal__person-value span');
        
        this.pictureDelete = this.$form.find('.js-load-image-delete');
        this.pictureInput = this.$form.find('.js-load-image-input');

        this.successMessage = this.$form.find('.js-modal-success');
        this.errorMessage = this.$form.find('.js-modal-error');

        this.onSubmit();
        this.onSendPicture();
        this.onDeletePicture();
    }

    onSubmit() {
        this.$form.on("submit", (e) => {
            e.preventDefault();
            let validator = new Validator(this.$form);

            e.preventDefault();
            let self = this;
            let data = this.$form.serializeArray();

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

    onSendPicture() {
        this.pictureInput.on('change', () => {
            let filesProp = 'files';

            if (!this.pictureInput.prop(filesProp)) return false;

            let data = new FormData();
            data.append('picture', this.pictureInput.prop(filesProp)[0]);

            $.ajax({
                url: this.$form.attr('action'),
                method: 'post',
                processData: false,
                contentType: false,
                data,

                success: response => {
                    let parsedResponse = JSON.parse(response);
                    if (parsedResponse.success) {
                        this.pictureInput.trigger('imageLoad');

                        if (parsedResponse.data) {
                            if (parsedResponse.data.fio) this.renderProfileName(parsedResponse.data.fio);
                            if (parsedResponse.data.email) this.renderProfileMail(parsedResponse.data.email);
                        }

                        if (parsedResponse.message) {
                            this.renderSuccessMessage(parsedResponse.message);
                            this.renderErrorMessage('');
                        }
                    } else if (response.message) {
                        this.renderErrorMessage(parsedResponse.message);
                        this.renderSuccessMessage('');
                    }
                }
            });
        })
    }

    onDeletePicture() {
        this.pictureDelete.on('click', e => {
            e.preventDefault();
            let actionName = 'deletePicture';
            let data = new FormData();
            data.append(actionName, true);
            $.ajax({
                url: this.$form.attr('action') + actionName + '/',
                method: 'post',
                data,
                processData: false,
                contentType: false,

                success: response => {
                    let parsedResponse = JSON.parse(response);
                    if (parsedResponse.success) {
                        this.pictureDelete.trigger(actionName);

                        if (parsedResponse.message) {
                            this.renderSuccessMessage(parsedResponse.message);
                            this.renderErrorMessage('');
                        }
                    } else if (response.message) {
                        this.renderErrorMessage(parsedResponse.message);
                        this.renderSuccessMessage('');
                    }
                }
            });
        })
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
