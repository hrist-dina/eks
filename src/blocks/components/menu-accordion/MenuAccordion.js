import $ from "jquery";

export class MenuAccordion {
  constructor(selector = ".js-menu-accordion") {
    this.selector = selector;
    this.init();
  }
  init() {
    this.click();
  }

  click() {
    $(this.selector)
      .find("li.has-child")
      .on("click", function() {
        $(this)
          .children("ul")
          .slideToggle(300);

        $(this).toggleClass("is-open");
      });
  }
}
