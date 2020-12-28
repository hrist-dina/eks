import $ from "jquery";

class StudentReg {
    constructor() {
        this.form = $('#jsStudentReg');
        this.warningBlock = $('.js-reg-warning');
        this.init();
    }

    init() {
        this.onSubmitInit();
    }

    onSubmitInit() {
        this.form.on('submit', this.onSubmit.bind(this));
    }

    onSubmit(e) {
        e.preventDefault();
        let url = this.form.attr('action');
        let data = this.form.serializeArray();
        let self = this;
        if (!url) return false;
        for (let field of data) {
            if (!field.value) return false;
        }

        $.ajax(url, {
            type: 'POST',
            data: data,
            success(response) {
                if (response.success && response.data) {
                    self.form.html(response.data);
                }else if (!response.success && response.data) {
                    self.warningBlock.html(response.data);
                }
            }
        });
    }
}

export { StudentReg };