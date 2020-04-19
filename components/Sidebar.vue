<template>
  <div>
    <button id="sidebar-toggler" v-b-toggle.sidebar>側邊欄</button>
    <b-sidebar id="sidebar" title="Mask Map" shadow width="375px">
      <b-container fluid>
        <b-row>
          <b-col cols="5">
            <b-img src="~/assets/doctor-icon.svg" fluid />
          </b-col>
          <ActivityDescription />
        </b-row>
        <b-row>
          <Searching />
        </b-row>
        <b-row>
          <PharmacyCards />
        </b-row>
      </b-container>
    </b-sidebar>
  </div>
</template>

<script>
import ActivityDescription from "~/components/ActivityDescription";
import PharmacyCards from "~/components/PharmacyCards";
import Searching from "~/components/Searching";

export default {
  components: { ActivityDescription, PharmacyCards, Searching }
};
</script>

<style scoped>
#sidebar-toggler {
  position: absolute;
  top: 100px;
  left: 10px;
  z-index: 1000;
  writing-mode: vertical-lr;
  padding: 30px;
  background-color: blue;
  color: white;
}

.b-sidebar-body > .container-fluid > .row {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
