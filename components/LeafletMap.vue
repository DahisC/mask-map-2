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
      next.forEach(fp => {
        _createMark({
          id: fp.properties.id,
          latlng: [fp.geometry.coordinates[1], fp.geometry.coordinates[0]],
          icon: "MORE",
          popup: fp.properties.name
        });
      });
      prev.forEach(fp => {
        _deleteMark({
          id: fp.properties.id
        });
      });
    }
  }
};
</script>

<style>
#map {
  height: 100%;
  position: relative;
}
</style>
