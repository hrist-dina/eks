import $ from "jquery";
import { MenuAccordion } from "%components%/menu-accordion/MenuAccordion";
import { Select } from "%components%/select/Select";

$(document).ready(function() {
  new MenuAccordion();
  new Select();
});
