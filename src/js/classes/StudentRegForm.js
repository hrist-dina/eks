import $ from "jquery";
import {Form} from './Form';
import {BaseModal} from './base-modal';

class StudentRegForm extends Form {
    init() {
        this.$form = $(this.form);
        this.warningBlock = this.$form.find('.js-reg-warning');
        super.init();
        this.onRegActionInit();
    }

    onRegActionInit() {
        this.$form.on('submit', this.onRegAction.bind(this));
    }

    onRegAction(e) {
        e.preventDefault();
        let url = this.$form.attr('action');
        let data = this.$form.serializeArray();
        if (!url) return false;
        for (let field of data) {
            if (!field.value) return false;
        }

        $.ajax(url, {
            type: 'POST',
            data: data,
            success: response => {
                if (response.success && response.data) {
                    let prevModal = $('.js-modal-study');
                    BaseModal.closeCurrent(prevModal);
                    this.$form.html(response.data);
                }else if (!response.success && response.data) {
                    this.warningBlock.html(response.data);
                }
            }
        });
    }
}

export { StudentRegForm };