import $ from "jquery";
import Swiper from "swiper";

class SliderStudy {
    constructor(selector, options = {}) {
        this.selector = selector;
        if (options.preloadSelector) this.preloadContainer = $(options.preloadSelector);
        this.loopedSlides = 6;
        this.nextSlideAddIndexesCount = 1;
        this.slideDuplicateSelector = '.swiper-slide-duplicate';
        this.disabledClass = 'disabled';
        this.linkSelector = '.study-sidebar__link';
        this.prevSlide = null;
        this.nextSlide = null;
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
                loopedSlides: this.loopedSlides,
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
            this.swiper.on('init', self.checkIfSlidingIsAvailable.bind(self));


            if (this.swiper) {
                this.swiper.on('slideChange', () => {
                    this.swiper.$wrapperEl.trigger('scroll');
                });

                this.swiper.on('slideChange', this.checkIfSlidingIsAvailable.bind(this));
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

    checkIfSlidingIsAvailable() {
        let activeIndex = this.swiper.activeIndex;
        // Отнимаем количество loopedSlides, т.к. в бесконечном слайдере это количество прибавляется к РЕАЛЬНОМУ индексу слайда
        let prevSlideIndex = activeIndex - this.loopedSlides - this.nextSlideAddIndexesCount;
        let nextSlideIndex = activeIndex - this.loopedSlides + this.nextSlideAddIndexesCount;

        this.prevSlide = this.swiper.$el.find(`.swiper-slide[data-swiper-slide-index='${prevSlideIndex}']:not(${this.slideDuplicateSelector})`);
        this.nextSlide = this.swiper.$el.find(`.swiper-slide[data-swiper-slide-index='${nextSlideIndex}']:not(${this.slideDuplicateSelector})`);

        this.checkIfPrevSlideIsEnabled();
        this.checkIfNextSlideIsEnabled();
    }

    checkIfPrevSlideIsEnabled() {
        if (!this.prevSlide.length) return false;

        if (this.prevSlide.find(this.linkSelector).hasClass(this.disabledClass)) {
            this.swiper.allowSlidePrev = false;
        } else {
            this.swiper.allowSlidePrev = true;
        }
    }

    checkIfNextSlideIsEnabled() {
        if (!this.nextSlide.length) return false;

        if (this.nextSlide.find(this.linkSelector).hasClass(this.disabledClass)) {
            this.swiper.allowSlideNext = false;
        } else {
            this.swiper.allowSlideNext = true;
        }
    }
}

export { SliderStudy };