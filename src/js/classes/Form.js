import $ from "jquery";
import Validator from "./Validator";

export class Form {
  constructor(selector = ".js-form") {
    this.form = selector;

    this.init();
  }

  init() {
    this.onSubmit();
  }

  onSubmit() {
    $(document)
      .find(this.form)
      .on("submit", function(e) {
        let validator = new Validator($(this));
        if (validator.init()) {
          e.preventDefault();
        }
      });
  }
}
