<template>
  <div>
    <div id="sidebar-toggler" v-b-toggle.sidebar>側邊欄</div>
    <b-sidebar id="sidebar" shadow width="400px">
      <template v-slot:title>
        <div>
          <span>口罩地圖</span>
          <span
            :style="{
              fontSize: '0.5em',
              textAlign: 'right',
              color: 'rgba(0, 0, 0, 0.25)'
            }"
            >資料更新於：0 秒前</span
          >
        </div>
      </template>
      <b-container fluid :style="{ position: 'relative' }">
        <b-row v-b-visible="visibleHandler">
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
      <div id="scroll-up-btn" v-if="!isTopVisible" @click="scrollToTop">
        <b-icon-arrow-bar-up variant="white" scale="1.5" />
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import ActivityDescription from "~/components/ActivityDescription";
import PharmacyCards from "~/components/PharmacyCards";
import Searching from "~/components/Searching";
import { BIcon, BIconArrowBarUp } from "bootstrap-vue";

export default {
  data() {
    return {
      isTopVisible: true
    };
  },
  components: {
    ActivityDescription,
    PharmacyCards,
    Searching,
    BIconArrowBarUp
  },
  methods: {
    visibleHandler(isVisible) {
      this.isTopVisible = isVisible;
    },
    scrollToTop() {
      let target = document.querySelector(".b-sidebar-body");
      target.scrollTop = 0;
    }
  }
};
</script>

<style scoped>
#scroll-up-btn {
  position: absolute;
  background-color: #0ba29c;
  opacity: 0.75;
  border-radius: 50%;
  right: 0;
  bottom: 0;
  margin: 0px 20px 5px 0px;
  height: 40px;
  width: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

#scroll-up-btn {
  animation-name: floating;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0, 0, 0, 0);
}

#scroll-up-btn:hover {
  opacity: 1;
}

@keyframes floating {
  0% {
    bottom: 0px;
  }
  50% {
    bottom: 10px;
  }
  100% {
    bottom: 0px;
  }
}

#sidebar > header > strong > span:nth-child(2) {
  font-size: 0.5em;
  color: rgba(0, 0, 0, 0.25);
  margin-right: 10px;
}

#sidebar-toggler {
  font-family: Microsoft JhengHei;
  position: absolute;
  top: 100px;
  left: 0px;
  z-index: 1000;
  padding: 7.5px;
  text-align: center;
  writing-mode: vertical-lr;
  background-color: var(--color-main);
  color: white;
  border-radius: 0 10px 10px 0;
  cursor: pointer;
  border: 3px solid rgba(0, 0, 0, 0.125);
  border-left-style: none;
  opacity: 0.7;
}

#sidebar-toggler:hover {
  opacity: 0.9;
}

.b-sidebar-body > .container-fluid > .row {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
