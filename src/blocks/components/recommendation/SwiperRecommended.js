import { SwiperBase } from "../../../js/classes/SwiperBase";

export class SwiperRecommended extends SwiperBase {
  bindOptions() {
    this.screenWidht = 1840;
    super.bindOptions({
      breakpoints: {
        1840: {
          slidesPerView: 4
        },
        992: {
          slidesPerView: "auto"
        }
      }
    });
  }
}
