import {BaseComponent} from "./base-component";
import $ from "jquery/dist/jquery";
import {BaseModal} from "./base-modal";

export class BuyBonusComponent extends BaseComponent {
    init() {
        this.$addButton = this.$element.find('.js-getBonusProduct');
        this.productId = this.$addButton.data('product-id');
        this.onSubmit();
    }

    onSubmit() {
        this.$addButton.on("click", (e) => {
            $(document).trigger("preloader.open");
            e.preventDefault();

            $.ajax({
                url: '/ajax-virtual/basket/addBonusProduct/',
                method: "post",
                data: {
                    'PRODUCT_ID': this.productId,
                },
                dataType: 'json',

                success: (response) => {
                    if (response.success === 1) {
                        BaseModal.openModal('buy-bonus');
                        setTimeout(()=>{
                            window.location.reload();
                        }, 3000)
                    }
                }
            });

        });
    }
}
