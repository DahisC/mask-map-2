<template>
  <Overlay>
    <b-container id="app" fluid>
      <LeafletMap />
      <Sidebar />
    </b-container>
  </Overlay>
</template>

<script>
import LeafletMap from "~/components/LeafletMap";
import Sidebar from "~/components/Sidebar";
import Overlay from "~/components/Overlay";

export default {
  components: { LeafletMap, Sidebar, Overlay }
};
</script>

<style scoped>
#app.container-fluid {
  padding: 0;
  height: 100vh;
  position: relative;
}
</style>
