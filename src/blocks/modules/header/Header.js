import $ from "jquery";

export class Header {
  constructor(selector = ".js-mobile-menu") {
    this.menu = selector;
    this.open = `${selector}-open`;

    this.init();
  }

  init() {
    this.initScroll();
    this.onClick();
  }

  initScroll() {
    const self = this;
    $(window).scroll(function() {
      if ($(window).scrollTop() > 50 && $(window).width() < 1023) {
        $(self.menu).addClass("is-scroll");
      } else {
        $(self.menu).removeClass("is-scroll");
      }
    });
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
