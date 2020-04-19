<template>
  <div id="locate-myself-btn" @click="onLocate()">
    <b-img src="~/assets/locate-icon.svg" />
  </div>
</template>

<script>
import { locateMyself } from "../plugins/leaflet_api";

export default {
  mounted() {},
  methods: {
    onLocate() {
      locateMyself();
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
