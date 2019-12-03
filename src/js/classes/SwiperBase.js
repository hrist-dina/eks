import $ from "jquery";
import Swiper from "swiper";

export class SwiperBase {
  constructor(selector, options) {
    this.selector = selector;
    this.options = options;

    this.init();
  }

  init() {
    this.bindOptions();
    this.initSwiper();
  }

  bindOptions(options) {
    let defaultOptions = {
      slidesPerView: "auto"
    };
    this.options = $.extend(defaultOptions, options);
  }

  initSwiper() {
    if ($(this.selector).length) {
      new Swiper(this.selector, this.options);
    }
  }
}
