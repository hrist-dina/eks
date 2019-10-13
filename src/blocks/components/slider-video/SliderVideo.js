import $ from "jquery";
import SliderBase from "../../../js/classes/SliderBase";

class SliderVideo extends SliderBase {
  bindOptions(...options) {
    super.bindOptions(...options, {
      nextArrow: `${this.selector}-next`,
      prevArrow: `${this.selector}-prev`,
      slidesToShow: 1,
      autoplay: false,
      dots: true,
      speed: 1000,
      variableWidth: true,
      infinite: false
    });
  }

  init() {
    super.init();
  }
}

export { SliderVideo };
