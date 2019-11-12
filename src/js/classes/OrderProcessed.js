import {BaseComponent} from "./base-component";
import $ from "jquery/dist/jquery";

export class OrderProcessed extends BaseComponent {
    init() {
        $(document).on("orderProcessed.open", (e, orderId) => {
            this.$element.find('.js-text').text('Заказ №' + orderId +' оформлен!')
            this.$element.slideDown();
        });
    }
}
