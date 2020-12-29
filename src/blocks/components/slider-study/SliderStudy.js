import $ from "jquery";
import SliderBase from "../../../js/classes/SliderBase";

class SliderStudy extends SliderBase {
    bindOptions(...options) {
        super.bindOptions(...options, {
            autoplay: false,
            dots: false,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 1,
            cssEase: 'linear',
            vertical: true,
            draggable: true,
            infinite: true,
            arrows: false,
            centerMode: true,
        });
    }

    init() {
        super.init();
        let $this = $(this);
        console.log($this.find('.js-study-sidebar__item.active'));
        // this.slideItem = $this.find('.js-study-sidebar__item');
        this.slideItem = $('.js-study-sidebar__item');
        this.activeSlideItem = $this.find('.js-study-sidebar__item.active');
        this.initLastOrFirstSlideCheck.bind(this);
        this.initScroll();
    }

    initScroll() {
        this.slideItem.on('wheel', this.scrollSlider.bind(this));
    }

    initLastOrFirstSlideCheck() {
        this.slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            console.log(nextSlide)
            if ( nextSlide == 0 ) {
                var cls = 'slick-current slick-active' + ( this.options.centerMode ? ' slick-center' : '' );
                console.log(cls);
                setTimeout(function() {
                    $( '[data-slick-index="' + slick.$slides.length + '"]' ).addClass( cls ).siblings().removeClass( cls );
                    for (var i = slick.options.slidesToShow - 1; i >= 0; i--) {
                        $( '[data-slick-index="' + i + '"]' ).addClass( cls );
                    }
                }, 10 );
            } else if (nextSlide === slick.$slides.length - 1 ) {
                var cls = 'slick-current slick-active slick-center';
                setTimeout(function() {
                    $( '[data-slick-index="' + nextSlide + '"]' ).addClass( cls ).siblings().removeClass( cls );
                    for (var i = -1; i >= -1*slick.options.slidesToShow ; i--) {
                        $( '[data-slick-index="' + i + '"]' ).addClass( cls );
                    }
                }, 10 );
            }
        });
    }

    scrollSlider(e) {
        e.preventDefault();
        if (e.originalEvent.deltaY < 0) {
            this.slider.slick('slickNext');
        } else {
            this.slider.slick('slickPrev');
        }
    }
}

export { SliderStudy };