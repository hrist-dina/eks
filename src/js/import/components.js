import $ from "jquery";
import {MenuAccordion} from "%components%/menu-accordion/MenuAccordion";
import {Select} from "%components%/select/Select";
import {CatalogDetail} from "%components%/catalog-detail/CatalogDetail";
import {FancyBox} from "../classes/FancyBox";
import {SliderMain} from "%components%/slider-main/SliderMain";
import {SliderVideo} from "%components%/slider-video/SliderVideo";
import {SliderStudy} from "%components%/slider-study/SliderStudy";
import {SwiperRecommended} from "%components%/recommendation/SwiperRecommended";
import {Map} from "%components%/map/Map";
import {BaseModal} from "../classes/base-modal";
import {ShareModal} from "../classes/ShareModal";
import {Quantity} from "%components%/quantity/Quantity";
import {WhereBuy} from "%components%/where-buy/WhereBuy";
import {StudySidebar} from "%components%/study-sidebar/StudySidebar";
import {StudentRegModal} from "../classes/StudentRegModal";
import {StudentAuth} from "../../blocks/components/student-auth/StudentAuth";
import {StudentRestore} from "../../blocks/components/student-restore/StudentRestore";
import {InputMask} from "../classes/InputMask";
import {Form} from "../classes/Form";
import {FormAuth} from "../classes/FormAuth";
import {Sort} from "../classes/Sort";
import {StoreBlock} from "../classes/StoreBlock";
import {BuyModal} from "../classes/BuyModal";
import {StudentProfileModal} from "../classes/StudentProfileModal";
import {Basket} from "../classes/Basket";
import {Preloader} from "../classes/Preloader";
import {OrderForm} from "../classes/OrderForm";
import {OrderProcessed} from "../classes/OrderProcessed";
import {OrderHistoryItem} from "../classes/OrderHistoryItem";
import {Search} from "../../blocks/components/search/Search";
import {BuyBonusComponent} from "../classes/BuyBonusComponent";
import {FormCooperation} from "../classes/FormCooperation";
import {ProfileForm} from "../classes/ProfileForm";
import {StudentProfileForm} from "../classes/StudentProfileForm";
import {PhoneConfirm} from "../classes/PhoneConfirm";
import {LoadImage} from "../classes/LoadImage";
import {YaShare} from "%components%/ya-share/YaShare";

$(document).ready(function () {
    new SliderMain(".js-slider-main");
    new SliderVideo(".js-slider-video");
    new SliderStudy(".js-slider-study");
    new MenuAccordion();
    new Select();
    new CatalogDetail();
    new FancyBox();
    new SwiperRecommended(".js-swiper-recommendation");
    new BaseModal();
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
    new PhoneConfirm();
    new LoadImage();
    new StudySidebar();
    $('.js-stores-wrap').each((i, el) => {
        new StoreBlock(el);
    });
    $('.js-modal-add2basket').each((i, el) => {
        new BuyModal(el);
    });
    $('.js-basket').each((i, el) => {
        new Basket(el);
    });
    $('.js-wrapper').each((i, el) => {
        new Preloader(el);
    });
    $('.js-order-processed').each((i, el) => {
        new OrderProcessed(el);
    });
    $('.js-form-order').each((i, el) => {
        new OrderForm(el);
    });
    $('.js-order-history-item').each((i, el) => {
        new OrderHistoryItem(el);
    });
    $('.js-bonusBuyComponent').each((i, el) => {
        new BuyBonusComponent(el);
    });
    $('.js-cooperationForm').each((i, el) => {
        new FormCooperation(el);
    });
    $('.js-form-profile').each((i, el) => {
        new ProfileForm(el);
    });
    
    if ($('.js-modal-profile')) {
        new StudentProfileModal('.js-modal-profile');
    }
    if ($('.js-modal-share')) {
        new ShareModal('.js-modal-share');
    }

    new Search();

    new StudentRegModal('.js-modal-study');
    new StudentAuth();
    new StudentRestore();

    if ($('.share')) {
        new YaShare('.share');
    }
});
