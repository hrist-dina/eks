import $ from "jquery";
import { Header } from "../../blocks/modules/header/Header";
import "%modules%/footer/footer.js";
import "%modules%/main/main.js";

$(document).ready(function() {
  new Header();
});
