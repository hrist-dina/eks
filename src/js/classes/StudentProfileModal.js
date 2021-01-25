import {FormModal} from "./FormModal";
import {StudentProfileForm} from './StudentProfileForm';

const selectorBase = ".js-modal-profile";

class StudentProfileModal extends FormModal {

    constructor(selector = selectorBase, options = {}) {
        super(selector, options);
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
    
    static clear(element) {
        return false;
    }
}

export {StudentProfileModal};