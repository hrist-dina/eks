import $ from "jquery";
import SwiperBase from "../../../js/classes/SwiperBase";
import Swiper from "swiper";

class SliderStudy {
    constructor(selector) {
        this.selector = selector;
        this.activeSlide =
        // this.options = options;

        this.init();
    }
    init() {
        // super.init();
        // this.bindOptions();
        this.initSwiper();
        this.swiperAfterInit();
    }

    initSwiper() {
        if ($(this.selector).length) {
            new Swiper(this.selector, {
                direction: 'vertical',
                slidesPerView: 5,
                // loopedSlides: 3,
                // loopAdditionalSlides: 3,
                mousewheel: true,
                atuoHeight: true,
                loop: true,});
        }
    }

    swiperAfterInit() {
        this.wrapper = $(this.selector).find('.js-study__slider');
        this.activeItem = this.wrapper.find('.js-study-sidebar__item.active');
        this.centerActiveItem();
    }

    centerActiveItem() {
        if (!this.wrapper || !this.activeItem) return false;

        let activeItemOffsetTop = this.activeItem.offset().top;
        let wrapperHeight = this.wrapper.height();
        console.log(wrapperHeight);
        let centerPosition = wrapperHeight / 2;
        console.log(centerPosition);
        let activeItemCenterOffset  = Number(centerPosition) - Number(activeItemOffsetTop);
        console.log(activeItemCenterOffset);
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