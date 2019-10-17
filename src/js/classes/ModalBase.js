import $ from "jquery";
import iziModal from "izimodal-1.6.0";
// Initialise imported function as jQuery function
$.fn.iziModal = iziModal;

class ModalBase {
  constructor(selector = ".js-modal", options = {}) {
    this.selector = selector;
    this.element = $(document).find(this.selector);
    this.selectorOpen = `${selector}-open`;
    this.selectorClose = `${selector}-close`;
    this.options = $.extend(ModalBase.baseOptions(), options);
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

  static selectorModalContent() {
    return "js-modal-content";
  }
  static selectorModalText() {
    return "js-modal-text";
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

  close() {
    this.element.map((item, elem) => {
      $(elem).iziModal("close");
      ModalBase.hideMessage(elem);
      ModalBase.clear(elem);
    });
  }

  static successMessage() {
    return {
      title: "Успешно!",
      text: "Запрос отправлен."
    };
  }

  static renderMessage(message = ModalBase.successMessage) {
    let modalText = $("<div>", { class: ModalBase.selectorModalText() });
    if (message.title) {
      let title = $("<div>", { class: "modal__title" }).text(message.title);
      modalText.append(title);
    }
    if (message.text) {
      let text = $("<div>", { class: "modal__text" }).text(message.text);
      modalText.append(text);
    }
    return modalText;
  }

  static setSuccessMessage(element, message) {
    let close = $(element).find(".js-modal-close");
    let modalContent = $("<div>", { class: ModalBase.selectorModalContent() });
    let content = $(close).siblings();
    modalContent.append(content);
    close.after(modalContent);
    modalContent.fadeOut();
    close.after(ModalBase.renderMessage(message));
  }

  static hideMessage(element) {
    const content = $(element).find(`.${ModalBase.selectorModalContent()}`);
    if ($(content).length) {
      $(content).fadeIn();
    }
    const text = $(element).find(`.${ModalBase.selectorModalText()}`);
    if ($(text).length) {
      $(text).fadeOut();
    }
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
    ModalBase.hideMessage();
    return this;
  }

  static showSuccessMessage(modal, successMessage) {
    ModalBase.setSuccessMessage(modal, successMessage);
    setTimeout(function() {
      ModalBase.closeCurrent(modal);
      setTimeout(function() {
        ModalBase.clear(modal);
        ModalBase.hideMessage(modal);
      }, 1000);
    }, 3000);
  }
}

export { ModalBase };
