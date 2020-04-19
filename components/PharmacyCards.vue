<template>
  <b-col cols="12">
    <p
      v-if="searchingCity === '' && filteredPharmacies.length === 0"
      class="text-center"
    >要先搜尋才有東西顯示ㄛ ( ´ ▽ ` )ﾉ</p>
    <p
      v-if="searchingCity !== '' && filteredPharmacies.length === 0"
      class="text-center"
    >這個區域現在沒有資料 (^～^;)ゞ</p>
    <template v-if="filteredPharmacies.length !== 0">
      <b-card v-for="p in filteredPharmacies" :key="p.properties.id">
        <!-- <div class="card-locate-btn">
        <b-img src="../assets/locate-icon.svg" width="40px" />
        </div>-->
        <!-- <div class="card-call-btn">
        <b-img src="../assets/call-icon.svg" width="30px" />
        </div>-->
        <b-icon
          id="card-locate-btn"
          icon="cursor-fill"
          class="rounded-circle bg-info"
          variant="light"
          @click="
          onLocateClick({
            id: p.properties.id,
            latlng: [p.geometry.coordinates[1], p.geometry.coordinates[0]]
          })
        "
        />
        <b-icon id="card-call-btn" icon="phone" class="rounded-circle bg-info" variant="light" />
        <b-card-title
          class="font-weight-bold"
          :style="{ color: 'var(--color-main)' }"
        >{{ p.properties.name }}</b-card-title>
        <b-card-text>
          <span :style="{ color: 'var(--color-gray)' }">
            <b-icon-phone class="align-middle" />
            {{ p.properties.phone }}
          </span>
          <span :style="{ color: 'var(--color-gray)' }">
            <b-icon-house class="align-middle" />
            {{ p.properties.address }}
          </span>
          <span :style="{ color: 'var(--color-gray)' }">
            <b-icon-calendar class="align-middle" />
            {{ p.properties.note }}
          </span>
        </b-card-text>
        <template v-slot:footer>
          <span
            :style="{
            backgroundColor: maskStockColor({ stock: p.properties.mask_adult })
          }"
          >成人 {{ p.properties.mask_adult }}</span>
          <span
            :style="{
            backgroundColor: maskStockColor({ stock: p.properties.mask_child })
          }"
          >兒童 {{ p.properties.mask_child }}</span>
        </template>
      </b-card>
    </template>
  </b-col>
</template>

<script>
import {
  BIcon,
  BIconHouse,
  BIconPhone,
  BIconCalendar,
  BIconCursorFill
} from "bootstrap-vue";

import { _openPopup } from "~/plugins/leaflet_api";

export default {
  components: {
    BIcon,
    BIconHouse,
    BIconPhone,
    BIconCalendar,
    BIconCursorFill
  },
  methods: {
    onLocateClick({ id, latlng }) {
      _openPopup({ id, latlng });
    },
    maskStockColor({ stock }) {
      if (stock > 100) {
        return "var(--color-main)";
      }
      if (stock > 50) {
        return "var(--color-yellow)";
      }
      if (stock > 0) {
        return "var(--color-red)";
      }
      if (stock === 0) {
        return "var(--color-dark-gray)";
      }
      return "rgba(0, 0, 0, 0)";
    }
  },
  computed: {
    searchingCity() {
      return this.$store.state.searching.searchingCity;
    },
    filteredPharmacies() {
      return this.$store.getters["searching/filteredPharmacies"];
    }
  }
};
</script>

<style scoped>
#card-locate-btn,
#card-call-btn {
  position: absolute;
  top: 0;
  height: 30px;
  width: 30px;
  padding: 5px;
  margin: 5px;
  cursor: pointer;
}

#card-locate-btn {
  right: 0;
}

#card-call-btn {
  right: 35px;
}

/*  */

.card {
  position: relative;
  border-radius: 10px;
  margin: 10px 0px;
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
  color: white;
}

.card-footer > span:nth-of-type(1) {
  float: left;
  border-bottom-left-radius: 10px;
  border-right-color: rgba(0, 0, 0, 0.125);
}

.card-footer > span:nth-of-type(2) {
  float: right;
  border-bottom-right-radius: 10px;
  border-left-color: rgba(0, 0, 0, 0.125);
}
</style>
