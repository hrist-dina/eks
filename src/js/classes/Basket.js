import {BaseComponent} from "./base-component";
import $ from "jquery/dist/jquery";

export class Basket extends BaseComponent {
    init() {
        this.initEvents();
    }

    initEvents() {
        this.$element.find('.js-basket-item-remove').on("click", (e) => {
            const $currentItem = $(e.target).closest('.js-basket-item');
            $(document).trigger("preloader.open");

            $.ajax({
                url: '/ajax/basket/remove/',
                method: "post",
                data: {
                    'BASKET_ID': $currentItem.data('product-id'),
                },
                dataType: 'json',

                success: (response) => {
                    if (response.success === 1) {
                        this.$element.html($(response.data.BASKET_HTML).html());
                        this.initEvents();
                        $(document).trigger("preloader.close");
                    }
                }
            });
        });

        this.$element.find('.js-basket-item-quantity').on("change", (e) => {
            const $currentItem = $(e.target).closest('.js-basket-item');
            const quantity = $currentItem.find('.js-basket-item-quantity').val();
            $(document).trigger("preloader.open");

            if (quantity > 0 && quantity <= parseInt($currentItem.find('.js-basket-item-quantity').attr('max'))) {
                $.ajax({
                    url: '/ajax/basket/quantity/',
                    method: "post",
                    data: {
                        'BASKET_ID': $currentItem.data('product-id'),
                        'QUANTITY': quantity
                    },
                    dataType: 'json',

                    success: (response) => {
                        if (response.success === 1) {
                            $('.js-basket').html($(response.data.BASKET_HTML).html());
                            this.initEvents();
                            $(document).trigger("preloader.close");
                        }
                    }
                });
            }
        });
    }
}
