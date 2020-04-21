<template>
  <div>
    <div id="sidebar-toggler" v-b-toggle.sidebar>口罩小精靈</div>
    <b-sidebar id="sidebar" shadow width="400px">
      <template v-slot:title>
        星期五
      </template>
      <b-container fluid>
        <b-row>
          <b-col cols="5">
            <b-img src="~/assets/doctor-icon.svg" fluid />
          </b-col>
          <ActivityDescription />
        </b-row>
        <b-row>
          <b-col cols="12">
            (Debug)
            {{ debugLog.status + "++" + debugLog.statusText }}
            {{ debugLog.request }}
          </b-col>
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
  components: { ActivityDescription, PharmacyCards, Searching },
  computed: {
    debugLog() {
      return this.$store.state.searching.debugLog;
    }
  }
};
</script>

<style scoped>
#sidebar-toggler {
  font-family: Microsoft JhengHei;
  position: absolute;
  top: 100px;
  left: 0px;
  z-index: 1000;
  padding: 10px;
  text-align: center;
  writing-mode: vertical-lr;
  background-color: var(--color-main);
  color: white;
  border-radius: 0 10px 10px 0;
  cursor: pointer;
  border: 3px solid rgba(0, 0, 0, 0.125);
  border-left-style: none;
}

#sidebar-toggler:hover {
  /* border: 3px solid var(--color-main);
  background-color: rgba(0, 0, 0, 0);
  color: var(--color-main);
  border-left-style: none; */
}

.b-sidebar-body > .container-fluid > .row {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
