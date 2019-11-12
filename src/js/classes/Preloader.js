import {BaseComponent} from "./base-component";
import $ from "jquery/dist/jquery";

export class Preloader extends BaseComponent {
    init() {
        this.initEvents();
    }

    initEvents() {
        $(document).on("preloader.open", () => {
            this.$element.addClass('preloader-visible');
        });
        $(document).on("preloader.close", () => {
            this.$element.removeClass('preloader-visible');
        });
    }
}
