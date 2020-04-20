<template>
  <div id="locate-myself-btn" @click="onLocate()">
    <b-img src="~/assets/locate-icon.svg" />
  </div>
</template>

<script>
import { locateMyself, _createMark, _deleteMark } from "../plugins/leaflet_api";

export default {
  mounted() {},
  methods: {
    async onLocate() {
      const locateRes = await locateMyself();
      this.$store.commit("searching/updateMyLocation", {
        latlng: locateRes.latlng
      });

      //   const nearbyPharmacies = this.$store.getters[
      //     "searching/nearbyPharmacies"
      //   ]({
      //     latlng: locateRes.latlng
      //   });
    }
  },
  computed: {
    nearbyPharmacies() {
      return this.$store.getters["searching/nearbyPharmacies"];
    }
  },
  watch: {
    nearbyPharmacies(next, prev) {
      prev.forEach(nP => {
        _deleteMark({
          id: nP.properties.id
        });
      });
      // setTimeout 的用意是假設會重複建立，可以先確保刪除後再執行
      setTimeout(() => {
        next.forEach(nP => {
          _createMark({
            id: nP.properties.id,
            latlng: [nP.geometry.coordinates[1], nP.geometry.coordinates[0]],
            icon: maskStockIcon({ stock: nP.properties.mask_adult }),
            popup: nP.properties.name
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

<style scoped>
div#locate-myself-btn {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 900;
  cursor: pointer;
  margin: 20px;
}
</style>
