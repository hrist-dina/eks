import {BaseComponent} from "./base-component";
import {BaseModal} from "./base-modal";
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
            const modal = BaseModal.openModal('result');

            console.log(quantity);
            console.log(this.$quantityInput.attr('max'));

            if (quantity > 0 && quantity <= this.$quantityInput.attr('max')) {
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
                            BaseModal.renderMessage(modal, "Товар добавлен");
                        } else {
                            BaseModal.renderMessage(modal, response.error);
                        }
                    }
                });
            } else {
                BaseModal.renderMessage(modal, "Вы ввели неправильное количество товара");
            }
        });
    }
}
