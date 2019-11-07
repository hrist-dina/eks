import $ from "jquery";
import iziModal from "izimodal-1.6.0";
// Initialise imported function as jQuery function
$.fn.iziModal = iziModal;

const selectorBase = ".js-modal";

class BaseModal {

  constructor(selector = selectorBase, options = {}) {
    this.selector = selector;
    this.element = $(document).find(this.selector);
    this.selectorOpen = `${selector}-open`;
    this.selectorClose = `${selector}-close`;
    this.options = $.extend(BaseModal.baseOptions(), options);
    this.init();
  }

  static baseOptions() {
    return {
      radius: 0,
      width: "auto",
      borderBottom: false,
      closeButton: false,
      focusInput: false
    };
  }

  static closeCurrent(elem) {
    $(elem).iziModal("close");
  }

  init() {
    if (this.element.length) {
      this.element.iziModal(this.options);
      this.onClick();
    }
  }

  onClick() {
    const self = this;

    $(document)
      .find(this.selectorOpen)
      .on("click", function(event) {
        event.preventDefault();
        self.close();
        self.open($(this).data("modal-type"));
      });
    $(this.selectorClose).on("click", function(event) {
      event.preventDefault();
      self.close();
    });
  }

  open(type) {
    this.element
      .filter(function() {
        return $(this).data("modal-type") === type;
      })
      .iziModal("open");
  }

  static openModal(type) {
    $(selectorBase)
      .filter(function() {
        return $(this).data("modal-type") === type;
      })
      .iziModal("open");
    return $(selectorBase);
  }

  close() {
    this.element.map((item, elem) => {
      $(elem).iziModal("close");
      BaseModal.clear(elem);
    });
  }

  static renderMessage(modal, message) {
    $(modal).find('.js-modal-text').html($("<div>", { class: "popup__title" }).html(message));
  }

  static clear(element) {
    $(element)
      .find("input")
      .filter(":text, :password, :file")
      .val("")
      .end()
      .filter(":checkbox, :radio")
      .removeAttr("checked")
      .end()
      .end()
      .find("textarea")
      .val("")
      .end()
      .find("select")
      .prop("selectedIndex", 0)
      .find("option:selected")
      .removeAttr("selected")
      .end()
      .find("button[type=submit]")
      .prop("disabled", false);
    return this;
  }
}

export { BaseModal };
