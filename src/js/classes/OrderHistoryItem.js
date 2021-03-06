import {BaseComponent} from "./base-component";
import $ from "jquery/dist/jquery";

export class OrderHistoryItem extends BaseComponent {
    init() {
        this.$element.find('.js-order-repeat').on('click', (e)=> {
            const $el = $(e.target);
            const orderId = $el.data('id');
            $(document).trigger("preloader.open");

            $.ajax({
                url: '/ajax-virtual/order/repeat/',
                method: "post",
                data: {
                    ORDER_ID: orderId
                },
                dataType: 'json',

                success: (response) => {
                    if (response.success === 1) {
                        if($el.data('reload') !== 'false') {
                            window.location = '/cart/';
                        }
                    } else {
                    }
                }
            });
        });
    }
}
