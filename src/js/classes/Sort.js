import $ from "jquery";


export class Sort {
    constructor() {
        this.$element = $('.js-select-sort');
        this.$element.on('change', () => {
            const sortName = this.$element.val();
            window.location = window.location.pathname + `?sort=${sortName}`
        });
    }
}
