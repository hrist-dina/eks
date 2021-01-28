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

            this.swiper.on('init', self.removePreload.bind(self));

            if (this.swiper) {
                this.swiper.on('slideChange', () => {
                    this.swiper.$wrapperEl.trigger('scroll');
                });
            }

            this.swiper.init();
        }
    }

    removePreload() {
        this.preloadContainer.removeClass('preloader-visible');
        this.swiper.$el.css('opacity', '1');
        this.preloadContainer.find('.preloader-loader').remove();
        this.preloadContainer.find('.preloader-wrap').remove();
    }
}

export { SliderStudy };