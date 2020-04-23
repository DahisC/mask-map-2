<template>
  <fragment>
    <b-col cols="12">
      <b-button block pill variant="outline-info" v-b-modal.searching-modal>
        <b-icon-search class="mr-1" scale="1" />
        <template v-if="searchingFor === 'Nearby'">
          <span>附近的藥局</span>
        </template>
        <template v-if="searchingFor === 'Area'">
          <span>{{ searchingCity }}</span>
          <span v-if="searchingArea !== ''">， {{ searchingArea }}</span>
        </template>
      </b-button>
    </b-col>
    <b-modal id="searching-modal" hide-header-close :scrollable="false">
      <!-- title -->
      <template v-slot:modal-title>
        <b>搜尋條件</b>
      </template>
      <!-- body -->
      <div>
        <!-- 鄉鎮市區 -->
        <b-dropdown
          :text="selectedCity === '' ? '城市' : selectedCity"
          block
          split
          split-variant="outline-info"
          variant="info"
          class="m-3"
        >
          <b-dropdown-item
            v-for="city in cityList"
            :key="city.text"
            @click="
              selectedCity = city.value;
              selectedArea = '';
            "
          >
            {{ city.text }}
          </b-dropdown-item>
        </b-dropdown>
        <!-- 區域 -->
        <b-dropdown
          :text="
            selectedCity === ''
              ? '請先選擇城市'
              : selectedArea === ''
              ? '不指定區域'
              : selectedArea
          "
          :disabled="selectedCity === ''"
          block
          split
          split-variant="outline-info"
          variant="info"
          class="m-3"
        >
          <b-dropdown-item @click="selectedArea = ''">
            不指定區域
          </b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item
            v-for="area in areaList"
            :key="area.text"
            @click="selectedArea = area.value"
          >
            {{ area.text }}
          </b-dropdown-item>
        </b-dropdown>
      </div>
      <!-- footer -->
      <template v-slot:modal-footer>
        <b-button
          variant="outline-danger"
          @click="$bvModal.hide('searching-modal')"
        >
          <b-icon-x />
        </b-button>
        <b-button
          variant="info"
          @click="
            () => {
              search();
              $bvModal.hide('searching-modal');
            }
          "
        >
          <b-icon-search scale="0.8" />
        </b-button>
      </template>
    </b-modal>
  </fragment>
</template>

<script>
import { BIcon, BIconSearch, BIconX } from "bootstrap-vue";
import cityCountyData from "~/assets/data/cityCountyData.json";

export default {
  data() {
    return {
      selectedCity: "",
      selectedArea: ""
    };
  },

  components: {
    BIcon,
    BIconSearch,
    BIconX
  },
  mounted() {
    this.$store.dispatch("searching/readPharmacies");
  },
  methods: {
    search() {
      this.$store.commit("searching/search", {
        cityName: this.selectedCity,
        areaName: this.selectedArea
      });
    }
  },
  computed: {
    cityList() {
      return cityCountyData.map(city => ({
        text: city.CityName,
        value: city.CityName
      }));
    },
    areaList() {
      const vm = this;
      try {
        return cityCountyData
          .find(city => city.CityName === vm.selectedCity)
          .AreaList.map(area => ({
            text: area.AreaName,
            value: area.AreaName
          }));
      } catch (err) {
        return [];
      }
    },
    searchingCity() {
      return this.$store.state.searching.searchingCity;
    },
    searchingArea() {
      return this.$store.state.searching.searchingArea;
    },
    searchingFor() {
      return this.$store.state.searching.searchingFor;
    }
  }
};
</script>

<style>
/* 在覆蓋原本的 Bootstrap 樣式時，不能有 scoped */
ul.dropdown-menu {
  overflow-y: auto;
  max-height: 50vh;
}
</style>
