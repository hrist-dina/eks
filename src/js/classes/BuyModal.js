import {BaseComponent} from "./base-component";
import $ from "jquery/dist/jquery";
import {BuyBlock} from "./BuyBlock";
import {BaseModal} from "./base-modal";


export class BuyModal extends BaseComponent {
    init() {
        this.inner = this.$element.find('.js-inner');

        $('.js-modal-add2basket-open').on('click', (e) => {
            const $el = $(e.target);
            $(window).trigger('catalog.getBuyModal', [$el.data('product-id')]);
        });

        $(window).on('catalog.getBuyModal', (e, productId) => {
            this.reloadModal(productId);
        });
    }

    reloadModal(productId) {
        $.ajax({
            url: '/ajax-virtual/catalog/getModal/',
            method: "post",
            data: {
                'PRODUCT_ID': productId,
            },
            dataType: 'json',

            success: (response) => {
                if (response.success === 1) {
                    this.inner.html(response.data.INNER_HTML);
                    this.$element.find('.js-buy-block').each((i, el) => {
                        new BuyBlock(el);
                    });
                    BaseModal.openModal('buy');
                }
            }
        });
    }
}
