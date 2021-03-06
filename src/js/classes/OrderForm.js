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
            let validator = new Validator(this.$form);

            if (!validator.init()) {
                $(document).trigger("preloader.open");
                $.ajax({
                    url: this.$form.attr('action'),
                    method: "post",
                    data: this.$form.serialize(),
                    dataType: 'json',

                    success: function (response) {
                        if (response.success === 1) {
                            $(document).trigger('orderProcessed.open', [response.data.ORDER_ID]);
                            $(document).trigger("preloader.close");
                        } else {
                        }
                    }
                });

                return false;
            }
        });
    }
}
