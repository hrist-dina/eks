import $ from "jquery";
import Swiper from "swiper";

class SliderStudy {
    constructor(selector) {
        this.selector = selector;

        this.init();
    }
    init() {
        this.initSwiper();
    }

    initSwiper() {
        if ($(this.selector).length) {
            this.swiper = new Swiper(this.selector, {
                direction: 'vertical',
                slidesPerView: 'auto',
                loopedSlides: 6,
                mousewheel: {
                    releaseOnEdges: true,
                },
                loop: true,
                height: 450,
                speed: 200,
                centeredSlides: true,
                freeMode: true,
            });

        }
    }
}

export { SliderStudy };