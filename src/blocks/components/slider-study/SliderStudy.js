import $ from "jquery";
import Swiper from "swiper";

class SliderStudy {
    constructor(selector, options = {}) {
        this.selector = selector;
        if (options.preloadSelector)
            this.preloadContainer = $(options.preloadSelector);
        this.loopedSlides = 5;
        this.nextSlideAddIndexesCount = 1;
        this.slideDuplicateSelector = ".swiper-slide-duplicate";
        this.disabledClass = "disabled";
        this.linkSelector = ".study-sidebar__link";
        this.prevSlide = null;
        this.prevSlideIndex = null;
        this.nextSlide = null;
        this.isInit = null;
        this.init();
    }
    init() {
        this.initSwiper();
    }

    initSwiper() {
        if ($(this.selector).length) {
            this.swiper = new Swiper(this.selector, {
                init: false,
                direction: "vertical",
                slidesPerView: "auto",
                loopedSlides: this.loopedSlides,
                mousewheel: {
                    releaseOnEdges: true,
                    sensitivity: .4,
                    thresholdTime: .7
                },
                loop: true,
                height: 450,
                speed: 400,
                centeredSlides: true,
                autoHeight: true,
                freeMode: true,
                breakpoints: {
                    1024: {
                        height: 650,
                    },
                }
            });

            let self = this;

            this.swiper.on("init", self.removePreload.bind(self));
            //this.swiper.on('init', self.checkIfSlidingIsAvailable.bind(self));

            if (this.swiper) {
                this.swiper.on("scroll", (event) => {
                    const activeIndex = this.swiper.activeIndex;
                    const prevIndex = activeIndex - 1;
                    const nextIndex = activeIndex + 1;
                    if (event.wheelDeltaY < 0 && this.swiper.slides[nextIndex]) {
                        this.swiper.slideTo(nextIndex);
                    } else if (event.wheelDeltaY > 0 && this.swiper.slides[prevIndex]) {
                        this.swiper.slideTo(prevIndex);
                    }
                    this.swiper.mousewheel.disable();
                });

                this.swiper.on("slideChange", this.processChangeSlide.bind(this));

                // this.swiper.on('slideChange', this.checkIfSlidingIsAvailable.bind(this));
            }

            this.swiper.init();
        }
    }

    removePreload() {
        this.preloadContainer.removeClass("preloader-visible");
        this.swiper.$el.css("opacity", "1");
        this.preloadContainer.find(".preloader-loader").remove();
        this.preloadContainer.find(".preloader-wrap").remove();
        this.isInit = true;
    }

    processChangeSlide() {
        if(!this.isInit) return false;

        const activeIndex = this.swiper.activeIndex;
        const prevIndex = activeIndex - 1;
        const nextIndex = activeIndex + 1;
        const active = $(this.swiper.slides[activeIndex]);

        const prev = $(this.swiper.slides[prevIndex]);
        const next = $(this.swiper.slides[nextIndex]);

        const isActiveDisabledLink = active
            .find(this.linkSelector)
            .hasClass(this.disabledClass);

        if (
            isActiveDisabledLink &&
            !prev.find(this.linkSelector).hasClass(this.disabledClass)
        ) {
            this.swiper.slideTo(prevIndex);
        } else if (
            isActiveDisabledLink &&
            !next.find(this.linkSelector).hasClass(this.disabledClass)
        ) {
            this.swiper.slideTo(nextIndex);
        } else if (!isActiveDisabledLink) {
            $(this.swiper.slides).removeClass("active");
            active.addClass("active");
            const activeLink = active.find(this.linkSelector);
            window.location = activeLink.attr("href");
        } else {
            let activeFindIndex = null;
            this.swiper.slides.each((i, el) => {
                if ($(el).hasClass('active')) {
                    activeFindIndex = i;
                    return false;
                }
            });
            if (activeFindIndex) {
                this.swiper.slideTo(activeFindIndex);
            }
        }
    }

    checkIfSlidingIsAvailable() {
        this.setPrevSlideIndex(this.swiper.previousIndex);
        console.log(this.prevSlideIndex);
        let activeIndex = this.swiper.activeIndex;
        // Отнимаем количество loopedSlides, т.к. в бесконечном слайдере это количество прибавляется к РЕАЛЬНОМУ индексу слайда
        let prevSlideIndex =
      activeIndex - this.loopedSlides - this.nextSlideAddIndexesCount;
        let nextSlideIndex =
      activeIndex - this.loopedSlides + this.nextSlideAddIndexesCount;

        this.prevSlide = this.swiper.$el.find(
            `.swiper-slide[data-swiper-slide-index='${prevSlideIndex}']:not(${this.slideDuplicateSelector})`
        );
        this.nextSlide = this.swiper.$el.find(
            `.swiper-slide[data-swiper-slide-index='${nextSlideIndex}']:not(${this.slideDuplicateSelector})`
        );

        this.checkIfPrevSlideIsEnabled();
        this.checkIfNextSlideIsEnabled();
    }

    checkIfPrevSlideIsEnabled() {
        if (!this.prevSlide.length) return false;

        if (this.prevSlide.find(this.linkSelector).hasClass(this.disabledClass)) {
            this.swiper.allowSlidePrev = false;
            this.swiper.slideTo(this.getPrevSlideIndex());
        } else {
            this.swiper.allowSlidePrev = true;
        }
    }

    checkIfNextSlideIsEnabled() {
        if (!this.nextSlide.length) return false;

        if (this.nextSlide.find(this.linkSelector).hasClass(this.disabledClass)) {
            console.log(this.nextSlide.find(this.linkSelector));
            this.swiper.allowSlideNext = false;
            this.swiper.slideTo(this.getPrevSlideIndex());
        } else {
            this.swiper.allowSlideNext = true;
        }
    }

    setPrevSlideIndex(index) {
        this.prevSlideIndex = index;
        return true;
    }

    getPrevSlideIndex() {
        if (!this.prevSlideIndex) return false;

        return this.prevSlideIndex;
    }
}

export { SliderStudy };
