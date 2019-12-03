import $ from "jquery";

export class Search {
  constructor(selector = ".js-search") {
    this.search = $(selector);

    this.init();
  }

  init() {
    this.focus();
  }

  focus() {
    const self = this;
    this.search.find("input").on("input", function() {
      let inputValue = $(this).val();
      if (inputValue !== "") {
        self.search.addClass("active");
      } else {
        self.search.removeClass("active");
      }
    });
  }
}
