import $ from "jquery";
import Swiper from "swiper";

class SliderStudy {
    constructor(selector, options = {}) {
        this.selector = selector;
        if (options.preloadSelector) this.preloadContainer = $(options.preloadSelector);
        this.init();
    }
    init() {
        this.initSwiper();
    }

    initSwiper() {
        if ($(this.selector).length) {
            this.swiper = new Swiper(this.selector, {
                init: false,
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

            let self = this;

            this.swiper.on('beforeInit', self.addPreload.bind(self));
            this.swiper.on('init', self.removePreload.bind(self));

            if (this.swiper) {
                this.swiper.on('slideChange', () => {
                    this.swiper.$wrapperEl.trigger('scroll');
                });
            }

            this.swiper.init();
        }
    }

    addPreload() {
        console.log(this.preloadContainer);
        this.swiper.$el.css('display', 'none');
        console.log(123);
        $(this.preloadContainer).trigger('preloader.open');
    }

    removePreload() {
        $(this.preloadContainer).trigger('preloader.close');
        this.swiper.$el.css('display', 'block');
        console.log(321);
    }
}

export { SliderStudy };