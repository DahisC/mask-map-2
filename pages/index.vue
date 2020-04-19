<template>
  <b-container id="app" fluid>
    <LeafletMap />
    <Sidebar />
  </b-container>
</template>

<script>
import LeafletMap from "~/components/LeafletMap";
import Sidebar from "~/components/Sidebar";

export default {
  components: { LeafletMap, Sidebar }
};
</script>

<style scoped>
#app.container-fluid {
  padding: 0;
  height: 100vh;
  position: relative;
}
</style>
