import {BaseComponent} from "./base-component";
import $ from "jquery/dist/jquery";
import {BuyBlock} from "../classes/BuyBlock";


export class StoreBlock extends BaseComponent {
    init() {
        this.initBuyBlockEvents();

        $(window).on('catalog.storeBlockUpdate', (e, html) => {
            this.$element.html(html);
            this.initBuyBlockEvents();
        });
    }

    initBuyBlockEvents() {
        this.$element.find('.js-buy-block').each((i, el) => {
            new BuyBlock(el);
        });
    }
}
