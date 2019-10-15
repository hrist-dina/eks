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
      infinite: false,
      mobileFirst: true,
      responsive: [
        {
          breakpoint: 1240,
          settings: {
            variableWidth: true
          }
        }
      ]
    });
  }

  init() {
    super.init();
  }
}

export { SliderVideo };
