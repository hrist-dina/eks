import $ from "jquery";
import SwiperBase from "../../../js/classes/SwiperBase";
import Swiper from "swiper";

class SliderStudy {
    constructor(selector) {
        this.selector = selector;

        this.init();
    }
    init() {
        // super.init();
        // this.bindOptions();
        this.initSwiper();
    }

    initSwiper() {
        if ($(this.selector).length) {
            this.swiper = new Swiper(this.selector, {
                direction: 'vertical',
                slidesPerView: 'auto',
                loopedSlides: 6,
                // loopedSlides: 3,
                // loopAdditionalSlides: 3,
                mousewheel: {
                    releaseOnEdges: true,
                },
                loop: true,
                height: 450,
                speed: 200,
                centeredSlides: true,
                freeMode: true,
            });
            console.log(this.swiper.slides);
            let activeElement = null;
            for(let i = 0; i < this.swiper.slides.length; i ++) {
                if (this.swiper.slides[i].classList.contains('active')) {
                    activeElement = i;
                    break;
                }
            }
            this.swiper.slideTo(activeElement || 0)
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