import $ from "jquery";
import Validator from "./Validator";
import {Form} from "./Form";

export class OrderForm extends Form {
    init() {
        this.$form = $(this.form);
        this.onSubmit();
    }

    onSubmit() {
        this.$form.on("submit", (e) => {
            e.preventDefault();
            let validator = new Validator($(this));
            if (validator.init()) {

            } else {
                let $formErrors = this.$form.find('.js-form-auth-errors');

                $.ajax({
                    url: this.$form.attr('action'),
                    method: "post",
                    data: this.$form.serialize(),
                    dataType: 'json',

                    success: function (response) {
                        if (response.success === 1) {
                            window.location = window.location;
                        } else {
                            $formErrors.html(response.error);
                        }
                    }
                });

                return false;
            }
        });
    }
}
