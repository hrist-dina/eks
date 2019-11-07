import $ from "jquery/dist/jquery";

class BaseComponent {
    constructor(element) {
        this.$element = $(element);
        this.init();
    }

    init() {}
}

export {BaseComponent};