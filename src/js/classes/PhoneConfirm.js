import $ from "jquery";

export class PhoneConfirm {

  constructor() {
    const selector = '.js-phone-confirm';
    this.$el = $(selector);
    this.$link = $(`${selector}-link`);
    this.$input = $(`${selector}-input`);
    this.$block = $(`${selector}-block`);
    this.$timer = $(`${selector}-timer`);
    this.$again = $(`${selector}-again`);

    this.init();
  }

  get time() {
    return parseInt(this.$el.data('time')) || 120;
  }


  init() {
    this.$link.on('click', ({target}) => {
      if (!this.$block.hasClass('hide')) return;
      this.$block.removeClass('hide');
      const url = $(target).data('confirm-url');
      const phone = this.$input.val();
      this.sendConfirm(url, phone);
      this.timer();
    });
  }

  sendConfirm(url, phone) {
    $.ajax({
      url,
      method: "post",
      data: {
        phone,
      },
      dataType: 'json',
      success: (response) => {
        if (response.success === 1) {
          console.log(response);
        } else {
          console.log(response);
        }
      }
    });
  }

  timer() {
    let time = this.time;
    const timer = setInterval( () => {
      const seconds = time % 60;
      const minutes = time / 60 % 60;
      if (time <= 0) {
        clearInterval(timer);
        this.$again.removeClass('disabled');
        this.$timer.html(this.strTime(0, 0));
      } else {
        this.$timer.html(this.strTime(minutes, seconds));
      }
      --time;
    }, 1000);
  }

  formatTime(time) {
    return time > 9 ? time : `0${time}`;
  }

  strTime(minutes, seconds) {
    return `${this.formatTime(Math.trunc(minutes))}:${this.formatTime(seconds)}`;
  }
}
