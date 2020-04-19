<template>
  <b-col cols="12">
    <b-card>
      <!-- <div class="card-locate-btn">
        <b-img src="../assets/locate-icon.svg" width="40px" />
      </div> -->
      <div class="card-call-btn">
        <b-img src="../assets/call-icon.svg" width="30px" />
      </div>
      <b-card-title
        class="font-weight-bold"
        :style="{ color: 'var(--color-main)' }"
        >小呆藥局</b-card-title
      >
      <b-card-text>
        <span :style="{ color: 'var(--color-gray)' }">
          <b-icon-phone class="align-middle" /> 07-1234567
        </span>
        <span :style="{ color: 'var(--color-gray)' }">
          <b-icon-house class="align-middle" /> 高雄市小港區
        </span>
      </b-card-text>
      <template v-slot:footer>
        <span :style="{ color: 'white' }">成人 30</span>
        <span :style="{ color: 'white' }">兒童 10</span>
      </template>
    </b-card>
  </b-col>
</template>

<script>
import { BIcon, BIconHouse, BIconPhone } from "bootstrap-vue";

export default {
  components: {
    BIcon,
    BIconHouse,
    BIconPhone
  }
};
</script>

<style scoped>
.card-locate-btn,
.card-call-btn {
  position: absolute;
  top: 0;
  padding: 10px;
}

.card-locate-btn {
  right: 0;
}

.card-call-btn {
  right: 0px;
}

/*  */

.card {
  position: relative;
  border-radius: 10px;
}

.card-text > span {
  width: 100%;
  display: block;
}

.card-footer {
  padding: 0;
}

.card-footer > span {
  width: 50%;
  text-align: center;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0);
}

.card-footer > span:nth-of-type(1) {
  float: left;
  background-color: aqua;
  border-bottom-left-radius: 10px;
  border-right-color: rgba(0, 0, 0, 0.125);
}

.card-footer > span:nth-of-type(2) {
  float: right;
  background-color: brown;
  border-bottom-right-radius: 10px;
  border-left-color: rgba(0, 0, 0, 0.125);
}
</style>
