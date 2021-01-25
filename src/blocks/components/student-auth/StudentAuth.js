import $ from "jquery";

class StudentAuth {
    constructor() {
        this.form = $('#jsStudentAuth');
        this.warningBlock = $('.js-auth-warning');
        this.init();
    }

    init() {
        this.onSubmitInit();
    }

    onSubmitInit() {
        this.form.on('submit', this.onSubmit.bind(this));
    }

    onAuthAction(e) {
        e.preventDefault();
        let url = this.form.attr('action');
        let data = this.form.serializeArray();
        if (!url) return false;
        for (let field of data) {
            if (!field.value) return false;
        }

        $.ajax(url, {
            type: 'POST',
            data: data,
            success: response =>  {
                if (response.success && response.data) {
                    document.location.href = response.data;
                } else if (!response.success && response.data) {
                    this.warningBlock.html(response.data);
                }
            }
        });
    }
}

export { StudentAuth };
