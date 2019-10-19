import $ from "jquery";
import { MapWhereBuy } from "./MapWhereBuy";
import { BaronScroll } from "../../../js/classes/BaronScroll";

export class WhereBuy {
  constructor(selector = ".js-where-buy", mapId = "map-where-buy") {
    this.selector = selector;
    this.filter = $(`${this.selector}-filter`);
    this.search = $(`${this.selector}-search`);
    this.searchMinLen = 3;
    this.map = mapId;
    this.item = $(`${this.selector}-item`);
    this.itemTitle = $(`${this.selector}-item-title`);

    this.init();
  }

  init() {
    this.initSearch();
    this.initFilter();
    this.initMap();
    this.onClick();
  }

  initSearch() {
    const self = this;
    this.search.find("input[type=text]").on("input", function() {
      let val = $(this).val();
      if (val.length > self.searchMinLen) {
        self.item.addClass("hide");
        let res = self.searchText(val);
        if (!res.length) {
          res = self.searchText(val.toUpperCase());
        }
        res.removeClass("hide");
        self.updateMap();
      }
      if (val.length === 0) {
        self.item.removeClass("hide");
        self.updateMap();
      }
    });
  }

  searchText(val) {
    return $(`${this.selector}-item:contains("${val}")`);
  }

  cleanFilters(filter = false) {
    let elemFilter = filter ? filter : this.filter;
    elemFilter
      .find("select option:selected")
      .prop("selected", false)
      .trigger("change.select2");
    elemFilter
      .find("select option:first")
      .prop("selected", false)
      .trigger("change.select2");
  }

  initFilter() {
    const self = this;

    this.filter.find("select").on("change", function() {
      let parent = $(this).parent(self.filter);
      self.cleanFilters(parent.siblings().filter(self.filter));
      let type = parent.data("filter");
      let val = $(this).val();

      self.item.removeClass("hide");

      self.item
        .filter(function() {
          return $(this).data(type) != val && val !== "all";
        })
        .addClass("hide");
      self.updateMap();
    });
  }

  itemData(element = false) {
    let item = element ? $(element) : $(this.item.get(0));
    return {
      region: item.data("region"),
      city: item.data("city"),
      locationX: item.data("location-x"),
      locationY: item.data("location-y"),
      hint: item.data("hint")
    };
  }

  getItemsData() {
    return $(this.item).map((key, item) => {
      $(item).removeClass("active");
      if (!$(item).hasClass("hide")) {
        return this.itemData(item);
      }
    });
  }

  onClick() {
    const self = this;
    this.item.on("click", function() {
      self.item.removeClass("active");
      $(this).addClass("active");
      self.mapObject.updateMap($(self.itemData($(this))));
    });
  }

  updateMap() {
    this.mapObject.updateMap(this.getItemsData());
    new BaronScroll({
      root: ".js-scroll"
    });
  }

  initMap() {
    let map = new MapWhereBuy(
      this.map,
      // Значения по умолчанию, чтобы заинитить карту, центр и зум оперделятся исходя из коллекции
      {
        center: [59.30988757933135, 67.74847676423883],
        zoom: 12
      }
    );
    map.setItems(this.getItemsData());
    this.mapObject = map;
  }
}
