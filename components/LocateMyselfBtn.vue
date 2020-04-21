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
