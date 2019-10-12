import SliderBase from "../../../js/classes/SliderBase";

class SliderMain extends SliderBase {
  bindOptions(...options) {
    super.bindOptions(...options, {
      nextArrow: '<div class="slider-button next"></div>',
      prevArrow: '<div class="slider-button prev"></div>',
      autoplay: true,
      autoplaySpeed: 5000,
      speed: 1000
    });
  }

  init() {
    super.init();
    this.initWrapDots();
  }

  initWrapDots() {
    let dots = this.slider.find(".slick-dots");
    if (dots) {
      dots.wrap('<div class="slick-dots-wrap">');
    }
  }
}

export { SliderMain };
