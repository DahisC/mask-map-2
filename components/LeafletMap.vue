<template>
  <div id="map">
    <LocateMyselfBtn />
  </div>
</template>

<script>
import LocateMyselfBtn from "~/components/LocateMyselfBtn";
import { initMap } from "../plugins/leaflet_api.js";

export default {
  components: {
    LocateMyselfBtn
  },
  mounted() {
    initMap();
  }
};
</script>

<style>
#map {
  height: 100%;
  position: relative;
}
</style>
