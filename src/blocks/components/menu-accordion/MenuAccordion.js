import $ from "jquery";

export class MenuAccordion {
  constructor(selector = ".js-menu-accordion") {
    this.selector = selector;
    this.list = `${selector}-list`;
    this.mobile = `${selector}-mobile`;
    this.init();
  }
  init() {
    this.click();
    this.mobileClick();
  }

  click() {
    $(this.list)
      .find("li.has-child")
      .on("click", function() {
        $(this)
          .children("ul")
          .slideToggle(300);

        $(this).toggleClass("is-open");
      });
  }

  mobileClick() {
    const self = this;
    $(this.mobile).on("click", function() {
      $(this).toggleClass("active");
      $(self.list)
        .slideToggle()
        .toggleClass("active");
      $(self.selector).toggleClass("active");
    });
  }
}
