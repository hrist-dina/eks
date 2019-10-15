import $ from "jquery";

export class Header {
  constructor(selector = ".js-mobile-menu") {
    this.menu = selector;
    this.open = `${selector}-open`;

    this.init();
  }

  init() {
    this.onClick();
  }

  onClick() {
    const self = this;
    $(this.open).on("click", function() {
      $(self.menu).toggleClass("active");
      $(this).toggleClass("active");
      $("html").toggleClass("o-hidden");
    });
  }
}
