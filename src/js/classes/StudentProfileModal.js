import {BaseModal} from "./base-modal";
import {StudentProfileForm} from './StudentProfileForm';

const selectorBase = ".js-modal-profile";

class StudentProfileModal extends BaseModal {

    constructor(selector = selectorBase, options = {}) {
        super(selector, options);
        this.fisrtInput = null;
        this.form = new StudentProfileForm(this.element.find('form'));
    }

    onClick() {
        const self = this;

        $(document)
            .find(this.selectorOpen)
            .on("click", function (event) {
                event.preventDefault();
                self.close();
                self.open($(this).data("modal-type"));
                let input = $(document).find(self.selector).find('input[type=text]').first();
                self.triggerInput(input);
            });
        $(this.selectorClose).on("click", function (event) {
            event.preventDefault();
            self.close();
        });
    }

    close() {
        this.element.map((item, elem) => {
            $(elem).iziModal("close");
        });
    }

    triggerInput(input) {
        if (!input.length) return false;

        input.focus();
        return true;
    }

    static clear(element) {
        return false;
    }
}

export {StudentProfileModal};