import $ from "jquery";
import { MenuAccordion } from "%components%/menu-accordion/MenuAccordion";
import { Select } from "%components%/select/Select";
import { CatalogDetail } from "%components%/catalog-detail/CatalogDetail";
import { FancyBox } from "../classes/FancyBox";
import { SliderMain } from "%components%/slider-main/SliderMain";
import { SliderVideo } from "%components%/slider-video/SliderVideo";
import { SwiperRecommended } from "%components%/recommendation/SwiperRecommended";
import { Map } from "%components%/map/Map";
import { ModalBase } from "../classes/ModalBase";
import { Quantity } from "%components%/quantity/Quantity";
import { WhereBuy } from "%components%/where-buy/WhereBuy";
import { InputMask } from "../classes/InputMask";
import { Form } from "../classes/Form";
import { FormAuth } from "../classes/FormAuth";
import { Sort } from "../classes/Sort";


$(document).ready(function() {
  new SliderMain(".js-slider-main");
  new SliderVideo(".js-slider-video");
  new MenuAccordion();
  new Select();
  new CatalogDetail();
  new FancyBox();
  new SwiperRecommended(".js-swiper-recommendation");
  new ModalBase();
  new Quantity();
  new InputMask().phone();
  new FormAuth(".js-form-auth");
  new Map("map-barnaul", {
    location: [53.32387907112886, 83.64198349999995],
    center: [53.32387907112886, 83.64198349999995],
    zoom: 16,
    hint: "ул. Попова , 242"
  });
  new Map("map-moscow", {
    location: [55.883661068828225, 37.51370899999999],
    center: [55.883661068828225, 37.51370899999999],
    zoom: 17,
    hint: "Коровинское шоссе 35 стр.2"
  });
  new WhereBuy();
  new Form();
  new Sort();
});
