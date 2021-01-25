import {BaseModal} from './base-modal';

export class FormModal extends BaseModal {
    init() {
        super.init();
        this.firstInput = this.element.find('input[type=text]:eq(0)');
        this.form = null;
    }

    open(type) {
        super.open(type);
        this.triggerInput();
    }

    triggerInput() {
        if (!this.firstInput) return false;

        this.firstInput.focus();
        return true;
    }
}