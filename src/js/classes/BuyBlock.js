import {BaseComponent} from "./base-component";
import $ from "jquery/dist/jquery";

export class BuyBlock extends BaseComponent {
    init() {
        this.$addButton = this.$element.find('.js-add-to-basket');
        this.$quantityInput = this.$element.find('.js-quantity-input');
        this.productId = this.$element.data('product-id');
        this.storeId = this.$element.data('store-id');
        this.onSubmit();
    }

    onSubmit() {
        this.$addButton.on("click", (e) => {
            e.preventDefault();
            const quantity = this.$quantityInput.val();

            if (quantity > 0 && quantity <= parseInt(this.$quantityInput.attr('max'))) {
                $.ajax({
                    url: '/ajax/basket/add/',
                    method: "post",
                    data: {
                        'PRODUCT_ID': this.productId,
                        'STOCK_ID': this.storeId,
                        'QUANTITY': quantity
                    },
                    dataType: 'json',

                    success: function (response) {
                        if (response.success === 1) {
                            $(window).trigger('catalog.storeBlockUpdate', [response.data.STOCK_HTML]);
                            alert('Товар в корзине. TODO:переделать');
                        }
                    }
                });
            }
        });
    }
}
