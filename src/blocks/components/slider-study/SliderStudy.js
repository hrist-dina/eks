import $ from "jquery";
import SwiperBase from "../../../js/classes/SwiperBase";
import Swiper from "swiper";

class SliderStudy {
    constructor(selector, options) {
        this.selector = selector;
        this.options = options;

        this.init();
    }
    init() {
        // super.init();
        // this.bindOptions();
        console.log(this.options);
        this.initSwiper();
    }

    initSwiper() {
        if ($(this.selector).length) {
            new Swiper(this.selector, {
                direction: 'vertical',
                slidesPerView: 1,
                spaceBetween: 30,
                mousewheel: true,
                loop: true,});
        }
    }

    bindOptions(options) {
        let defaultOptions = {
            direction: 'vertical',
            slidesPerView: 5,
            spaceBetween: 30,
            mousewheel: true,
            loop: true,
        };
        this.options = $.extend(defaultOptions, options);
    }
}

export { SliderStudy };