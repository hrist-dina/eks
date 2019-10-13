import $ from "jquery";
import SliderBase from "../../../js/classes/SliderBase";

class SliderMain extends SliderBase {
  bindOptions(...options) {
    super.bindOptions(...options, {
      nextArrow: `${this.selector}-next`,
      prevArrow: `${this.selector}-prev`,
      autoplay: true,
      dots: false,
      autoplaySpeed: 7000,
      speed: 1000
    });
  }

  init() {
    this.counterMin = $(`${this.selector}-min`);
    this.counterMax = $(`${this.selector}-max`);
    this.initCounter();
    super.init();
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
}

export { SliderMain };
