<template>
  <div id="locate-myself-btn" @click="test()">
    <b-img src="~/assets/locate-icon.svg" />
  </div>
</template>

<script>
import { putAMark, locateMyself } from "../plugins/leaflet_api";

export default {
  mounted() {},
  methods: {
    async test() {
      let myLocation = await locateMyself();
      putAMark({
        latlng: myLocation.latlng,
        icon: "SOLDOUT",
        popup: "測試測試"
      });
    }
  }
};
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
