import $ from "jquery";

export class StudySidebar {

  constructor() {
    const selector = '.js-study-sidebar';
    this.$el= $(selector);
    this.$scroll = this.$el.find(`${selector}-scroll`);

    this.init();
  }


  init() {
    const el = this.$el;
    this.$scroll.on('scroll', (e) => {
      if ($(e.target).scrollTop() > 0) {
        el.addClass('fadeTop');
      } else {
        el.removeClass('fadeTop');
      }

      if($(e.target).scrollTop() + $(e.target).innerHeight() >= $(e.target)[0].scrollHeight) {
        el.removeClass('fadeBottom');
      } else {
        el.addClass('fadeBottom');
      }
    });

    this.$scroll.trigger('scroll');
  }
}
