import $ from "jquery";
import { MenuAccordion } from "%components%/menu-accordion/MenuAccordion";
import { Select } from "%components%/select/Select";
import { CatalogDetail } from "%components%/catalog-detail/CatalogDetail";
import { FancyBox } from "../classes/FancyBox";
import { SliderMain } from "%components%/slider-main/SliderMain";
import { SliderVideo } from "%components%/slider-video/SliderVideo";
import { SwiperRecommended } from "%components%/recommendation/SwiperRecommended";

$(document).ready(function() {
  new SliderMain(".js-slider-main");
  new SliderVideo(".js-slider-video");
  new MenuAccordion();
  new Select();
  new CatalogDetail();
  new FancyBox();
  new SwiperRecommended(".js-swiper-recommendation");
});
