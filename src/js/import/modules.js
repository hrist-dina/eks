import $ from "jquery";
import { Header } from "../../blocks/modules/header/Header";
import "%modules%/footer/footer.js";
import "%modules%/main/main.js";
import { StudyPage } from "../../blocks/modules/Study-page/Study-page.js";

$(document).ready(function() {
  new Header();
  if ($('.js-cabinet__wrap').length) {
    console.log($('.js-cabinet__wrap'));
    new StudyPage();}
});
