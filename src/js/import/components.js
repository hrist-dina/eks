import $ from "jquery";
import { MenuAccordion } from "%components%/menu-accordion/MenuAccordion";
import { Select } from "%components%/select/Select";
import { CatalogDetail } from "%components%/catalog-detail/CatalogDetail";
import { FancyBox } from "../classes/FancyBox";

$(document).ready(function() {
  new MenuAccordion();
  new Select();
  new CatalogDetail();
  new FancyBox();
});
