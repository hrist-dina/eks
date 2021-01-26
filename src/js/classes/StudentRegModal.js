import $ from "jquery";
import {FormModal} from './FormModal';
import {StudentRegForm} from './StudentRegForm';

class StudentRegModal extends FormModal {
    constructor(selector, options = {}) {
        super(selector, options);
        this.form = new StudentRegForm('#jsStudentReg');
    }
}

export { StudentRegModal };