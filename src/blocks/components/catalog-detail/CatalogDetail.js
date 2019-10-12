import $ from "jquery";
// eslint-disable-next-line no-unused-vars
import slick from "slick-carousel";

export class CatalogDetail {
  constructor() {
    this.sliderMain = ".js-catalog-detail-image";
    this.sliderNav = ".js-catalog-detail-image-mini";

    this.init();
  }

  init() {
    this.initSlider();
  }

  initSlider() {
    $(this.sliderMain).slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: this.sliderNav
    });
    $(this.sliderNav).slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: this.sliderMain,
      arrows: false,
      dots: false,
      variableWidth: true,
      focusOnSelect: true,
      rows: 0
    });
  }
}
