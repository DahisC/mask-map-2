<template>
  <div id="map">
    <LocateMyselfBtn />
  </div>
</template>

<script>
import LocateMyselfBtn from "~/components/LocateMyselfBtn";
import { initMap, _createMark, _deleteMark } from "../plugins/leaflet_api.js";

export default {
  components: {
    LocateMyselfBtn
  },
  mounted() {
    initMap();
  },
  computed: {
    filteredPharmacies() {
      return this.$store.getters["searching/filteredPharmacies"];
    }
  },
  watch: {
    filteredPharmacies(next, prev) {
      prev.forEach(fp => {
        _deleteMark({
          id: fp.properties.id
        });
      });
      // setTimeout 的用意是假設會重複建立，可以先確保刪除後再執行
      setTimeout(() => {
        next.forEach(fp => {
          _createMark({
            id: fp.properties.id,
            latlng: [fp.geometry.coordinates[1], fp.geometry.coordinates[0]],
            icon: maskStockIcon({ stock: fp.properties.mask_adult }),
            popup: fp.properties.name
          });
        });
      }, 300);
    }
  }
};

function maskStockIcon({ stock }) {
  if (stock > 100) {
    return "MORE";
  }
  if (stock > 50) {
    return "AVERAGE";
  }
  if (stock > 0) {
    return "LESS";
  }
  if (stock === 0) {
    return "SOLDOUT";
  }
  return "SOLDOUT";
}
</script>

<style>
#map {
  height: 100%;
  position: relative;
}
</style>
