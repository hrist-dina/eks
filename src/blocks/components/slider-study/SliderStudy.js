import $ from "jquery";
import SliderBase from "../../../js/classes/SliderBase";

class SliderStudy extends SliderBase {
    bindOptions(...options) {
        super.bindOptions(...options, {
            // nextArrow: `${this.selector}-next`,
            // prevArrow: `${this.selector}-prev`,
            autoplay: false,
            dots: false,
            autoplaySpeed: 7000,
            speed: 1000,
            vertical: true,
            infinite: true,
            arrows: false,
            centerMode: true,
        });
    }

    init() {
        // this.counterMin = $(`${this.selector}-min`);
        // this.counterMax = $(`${this.selector}-max`);
        // this.initCounter();
        super.init();
        this.slideItem = $('.js-study-sidebar__item');
        this.initScroll();
        console.log(this);
    }

    initCounter() {
        const self = this;
        this.slider.on("init reInit afterChange", function(
            event,
            slick,
            currentSlide
        ) {
            self.counterMin.text((currentSlide ? currentSlide : 0) + 1);
            self.counterMax.text(slick.slideCount);
        });
    }

    initScroll() {
        this.slideItem.on('wheel', this.scrollSlider.bind(this));
    }

    scrollSlider(e) {
        e.preventDefault();
        console.log(123);
        if (e.originalEvent.deltaY < 0) {
            this.slider.slick('slickNext');
        } else {
            this.slider.slick('slickPrev');
        }
    }
}

export { SliderStudy };