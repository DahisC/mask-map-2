<template>
  <b-col cols="12">
    <p>(Debug) {{ debugLog }}</p>
    <p
      v-if="searchingCity === '' && unionOfPharmacies.length === 0"
      class="text-center"
    >
      要先搜尋才有東西顯示ㄛ ( ´ ▽ ` )ﾉ
    </p>
    <p
      v-if="searchingCity !== '' && unionOfPharmacies.length === 0"
      class="text-center"
    >
      這個區域現在沒有資料 (^～^;)ゞ
    </p>
    <transition-group name="fade">
      <template v-if="unionOfPharmacies.length !== 0">
        <b-card v-for="p in unionOfPharmacies" :key="p.properties.id">
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
          <b-icon
            id="card-call-btn"
            icon="phone"
            class="rounded-circle bg-info"
            variant="light"
          />
          <b-card-title
            class="font-weight-bold"
            :style="{ color: 'var(--color-main)' }"
            >{{ p.properties.name }}</b-card-title
          >
          <b-card-text>
            <transition name="fade">
              <div
                v-if="Object.keys(myLocation).length !== 0"
                :style="{ color: 'var(--color-gray)' }"
              >
                <span>
                  <b-icon-arrow90deg-right class="align-middle" />
                </span>
                <span>
                  距離約
                  {{
                    calculatedDistance({
                      latlng: {
                        lat: p.geometry.coordinates[1],
                        lng: p.geometry.coordinates[0]
                      }
                    })
                  }}
                </span>
              </div>
            </transition>
            <div :style="{ color: 'var(--color-gray)' }">
              <span>
                <b-icon-phone class="align-middle" />
              </span>
              <span>
                {{ p.properties.phone }}
              </span>
            </div>
            <div :style="{ color: 'var(--color-gray)' }">
              <span>
                <b-icon-house class="align-middle" />
              </span>
              <span>
                {{ p.properties.address }}
              </span>
            </div>
            <div :style="{ color: 'var(--color-gray)' }">
              <span>
                <b-icon-calendar class="align-middle" />
              </span>
              <span>
                {{ p.properties.note }}
              </span>
            </div>
          </b-card-text>
          <template v-slot:footer>
            <span
              :style="{
                backgroundColor: maskStockColor({
                  stock: p.properties.mask_adult
                })
              }"
              >成人 {{ p.properties.mask_adult }}</span
            >
            <span
              :style="{
                backgroundColor: maskStockColor({
                  stock: p.properties.mask_child
                })
              }"
              >兒童 {{ p.properties.mask_child }}</span
            >
          </template>
        </b-card>
      </template>
    </transition-group>
  </b-col>
</template>

<script>
import {
  BIcon,
  BIconHouse,
  BIconPhone,
  BIconCalendar,
  BIconCursorFill,
  BIconArrow90degRight
} from "bootstrap-vue";

import { _openPopup } from "~/plugins/leaflet_api";

export default {
  components: {
    BIcon,
    BIconHouse,
    BIconPhone,
    BIconCalendar,
    BIconCursorFill,
    BIconArrow90degRight
  },
  mounted() {
    console.log(this.$store.state.searching.myLocation);
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
    },
    calculatedDistance({ latlng, type }) {
      const mL = this.myLocation;
      const distance = Math.round(L.CRS.Earth.distance(mL, latlng));
      if (type === "number") {
        return distance;
      } else {
        if (distance >= 1000) {
          return `${(distance / 1000).toFixed(1)} 公里`;
        } else {
          return `${distance} 公尺`;
        }
      }

      return L.CRS.Earth.distance(mL, latlng);
    }
  },
  computed: {
    searchingCity() {
      return this.$store.state.searching.searchingCity;
    },
    filteredPharmacies() {
      return this.$store.getters["searching/filteredPharmacies"];
    },
    myLocation() {
      return this.$store.state.searching.myLocation;
    },
    unionOfPharmacies() {
      let sortedPharmacies = this.$store.getters["searching/unionOfPharmacies"];
      sortedPharmacies = Array.from(sortedPharmacies).sort((a, b) => {
        const distanceFromA = this.calculatedDistance({
          latlng: {
            lat: a.geometry.coordinates[1],
            lng: a.geometry.coordinates[0]
          },
          type: "number"
        });
        const distanceFromB = this.calculatedDistance({
          latlng: {
            lat: b.geometry.coordinates[1],
            lng: b.geometry.coordinates[0]
          },
          type: "number"
        });
        return distanceFromA - distanceFromB;
      });

      // return this.$store.getters["searching/unionOfPharmacies"];
      return sortedPharmacies;
    },
    debugLog() {
      return this.$store.state.searching.debugLog;
    }
  }
};
</script>

<style scoped>
.card.fade-enter-active,
.card.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0.5;
}

/*  */
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

/* .card-text > div > span {
  color: red;
  height: 10px;
  width: 20px;
  display: inline-block;
}

.card-text > div > p {
  color: aqua;
  display: inline;
} */

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
