import { Map } from "../map/Map";

export class MapWhereBuy extends Map {
  setItems(items) {
    this.items = items;
  }

  updateMap(items) {
    if (items.length) {
      this.setItems(items);
      this.initMap();
    } else {
      this.destroyMap();
    }
  }

  getPlaceMark() {
    try {
      // Создадим коллекцию геообъектов.
      let collection = new ymaps.GeoObjectCollection(null, {
        // Запретим появление балуна.
        hasBalloon: false
      });

      // Добавляем метки с городами
      this.items.each((key, item) => {
        collection.add(
          this.createPlaceMark([item.locationX, item.locationY], item.hint)
        );
      });

      return collection;
    } catch (e) {
      console.error(e);
    }
  }
}
