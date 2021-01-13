import $ from "jquery";

export class LoadImage {

  constructor() {
    const selector = '.js-load-image';
    this.$el = $(selector);
    this.$input = this.$el.find(`${selector}-input`);
    this.$preview = this.$el.find(`${selector}-preview`);
    this.$delete = this.$el.find(`${selector}-delete`);
    this.$change = this.$el.find(`${selector}-change`);

    this.init();
  }


  init() {
    let imageLoadEvent = 'imageLoad';
    this.$input.on(imageLoadEvent, ({target}) => this.readURL(target));
    this.$change.on('click', () => this.$input.trigger(imageLoadEvent));
    this.$delete.on('click', (e) => {
      e.preventDefault();
      this.$input.val('');
      this.$preview.attr('src', this.$input.data('default'));
    });
  }

  readURL(input) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.$preview.attr('src', e.target.result);
      };

      reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
  }
}
