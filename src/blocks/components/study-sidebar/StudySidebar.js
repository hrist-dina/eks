import $ from "jquery";

export class StudySidebar {

  constructor() {
    this.classes = {
      fadeBottom: 'fadeBottom',
      fadeTop: 'fadeTop',
    };

    const selector = '.js-study-sidebar';
    this.$el= $(selector);
    this.$scroll = this.$el.find(`${selector}-scroll`);
    this.sliderTransformY = null;
    this.sliderFadePosition = 0;
    this.init();
  }


  init() {
    const el = this.$el;
    this.$scroll.on('scroll', (e) => {
      // получаем translateY от слайдера
      let translateY = this.getTransformY();
      if (translateY < this.sliderTransformY && this.sliderFadePosition > -1) {
        this.sliderFadePosition = this.sliderFadePosition -= 1;
      } else if (translateY > this.sliderTransformY && this.sliderFadePosition < 1){
        this.sliderFadePosition = this.sliderFadePosition += 1;
      }
      this.setTransformY(this.getTransformY());

      if (this.sliderFadePosition === -1) {
        if (!el.hasClass(this.classes.fadeBottom)) el.addClass(this.classes.fadeBottom);
        if (el.hasClass(this.classes.fadeTop)) el.removeClass(this.classes.fadeTop);
      } else if (this.sliderFadePosition === 0) {
        if (!el.hasClass(this.classes.fadeBottom)) el.addClass(this.classes.fadeBottom);
        if (!el.hasClass(this.classes.fadeTop)) el.addClass(this.classes.fadeTop);
      } else {
        if (el.hasClass(this.classes.fadeBottom)) el.removeClass(this.classes.fadeBottom);
        if (!el.hasClass(this.classes.fadeTop)) el.addClass(this.classes.fadeTop);
      }
      this.setTransformY(this.getTransformY());
    });

    this.$scroll.trigger('scroll');
  }

  getTransformY() {
    return parseInt(this.$scroll.css('transform').split(',')[5]);
  }

  setTransformY(value) {
    if (!value) return false;

    this.sliderTransformY = value;
    return true;
  }
}
