import {BaseComponent} from "./base-component";
import $ from "jquery/dist/jquery";

export class Basket extends BaseComponent {
    init() {
        this.type = this.$element.data('type');
        this.initEvents();

        $(document).on("orderProcessed.open", () => {
            $('.js-title').slideUp();
            this.$element.slideUp(500, () => {
                this.$element.remove();
            });
        });
    }

    initEvents() {
        this.$element.find('.js-basket-item-remove').on("click", (e) => {
            const $currentItem = $(e.target).closest('.js-basket-item');
            $(document).trigger("preloader.open");

            $.ajax({
                url: '/ajax-virtual/basket/remove/',
                method: "post",
                data: {
                    'BASKET_ID': $currentItem.data('product-id'),
                    'TYPE': this.type
                },
                dataType: 'json',

                success: (response) => {
                    if (response.success === 1) {
                        this.render(response.data.BASKET_HTML);
                        this.initEvents();
                        $(document).trigger("preloader.close");
                    }
                }
            });
        });

        this.$element.find('.js-basket-item-quantity').on("change", (e) => {
            this.$currentItem = $(e.target).closest('.js-basket-item');
            this.quantity = this.$currentItem.find('.js-basket-item-quantity').val();
            this.maxAddCount = parseInt(this.$currentItem.find('.js-basket-item-quantity').attr('data-max'));
            this.defaultValue = parseInt(this.$currentItem.find('.js-basket-item-quantity').attr('data-defaultValue'));

            let quantity = this.quantity;
            let maxAddCount = this.maxAddCount;
            let $currentItem = this.$currentItem;

            if (quantity > 0 && quantity <= maxAddCount) {
                $(document).trigger("preloader.open");

                $.ajax({
                    url: '/ajax-virtual/basket/quantity/',
                    method: "post",
                    data: {
                        'BASKET_ID': $currentItem.data('product-id'),
                        'QUANTITY': quantity,
                        'TYPE': this.type
                    },
                    dataType: 'json',
                    success: (response) => {
                        if (response.success === 1) {
                            this.render(response.data.BASKET_HTML);
                            this.initEvents();
                            $(document).trigger("preloader.close");
                        }
                    }
                });
            } else if (quantity > maxAddCount) {
                $currentItem.find('.js-basket-item-quantity').val(maxAddCount);
            }
        });
    }

    debounce(callback, wait, immediate = false) {
        let timeout = null

        return function () {
            const callNow = immediate && !timeout
            const next = () => callback.apply(this, arguments)

            clearTimeout(timeout)
            timeout = setTimeout(next, wait)

            if (callNow) {
                next()
            }
        }
    }

    sendQuantity() {
        console.log('asdasd');

        let quantity = this.quantity;
        let maxAddCount = this.maxAddCount;
        let $currentItem = this.$currentItem;

        if (quantity > 0 && quantity <= maxAddCount) {
            $(document).trigger("preloader.open");

            $.ajax({
                url: '/ajax-virtual/basket/quantity/',
                method: "post",
                data: {
                    'BASKET_ID': $currentItem.data('product-id'),
                    'QUANTITY': quantity,
                    'TYPE': this.type
                },
                dataType: 'json',
                success: (response) => {
                    if (response.success === 1) {
                        this.render(response.data.BASKET_HTML);
                        this.initEvents();
                        $(document).trigger("preloader.close");
                    }
                }
            });
        } else if (quantity > maxAddCount) {
            $currentItem.find('.js-basket-item-quantity').val(maxAddCount);
        }
    }

    render(html) {
        const $html = $(html);

        if (this.type === 'order') {
            this.renderOrder($html);
        } else {
            this.$element.html($html.html());
        }
    }

    renderOrder($requestHtml) {
        this.$element.find('.js-basket-main').html($requestHtml.find('.js-basket-main').html());
        this.$element.find('.js-basket-additional').html($requestHtml.find('.js-basket-additional').html());
    }
}
