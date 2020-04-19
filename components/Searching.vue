<template>
  <fragment>
    <b-col cols="12">
      <b-button block pill variant="outline-info" v-b-modal.searching-modal>
        <b-icon-search scale="0.8" />
      </b-button>
    </b-col>
    <b-modal id="searching-modal" hide-header-close>
      <!-- title -->
      <template v-slot:modal-title>
        <b>搜尋條件</b>
      </template>
      <!-- body -->
      <div>
        <!-- 鄉鎮市區 -->
        <b-dropdown
          :text="selectedCity"
          block
          split
          split-variant="outline-info"
          variant="info"
          menu-class="w-100"
          class="m-3"
        >
          <b-dropdown-item
            v-for="city in cityList"
            :key="city"
            @click="selectedCity = city"
          >
            {{ city }}
          </b-dropdown-item>
        </b-dropdown>
        <!-- 區域 -->
        <b-dropdown
          :text="selectedArea"
          block
          split
          split-variant="outline-info"
          variant="info"
          menu-class="w-100"
          class="m-3"
        >
          <b-dropdown-item
            v-for="area in areaList"
            :key="area"
            @click="selectedArea = area"
          >
            {{ area }}
          </b-dropdown-item>
        </b-dropdown>
      </div>
      <!-- footer -->
      <template v-slot:modal-footer>
        <b-button variant="outline-danger">
          <b-icon-x />
        </b-button>
        <b-button variant="info">
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
  components: {
    BIcon,
    BIconSearch,
    BIconX
  },
  data() {
    return {
      selectedCity: "",
      selectedArea: ""
    };
  },
  computed: {
    cityList() {
      console.log(cityCountyData);
      return cityCountyData.map(city => city.CityName);
    },
    areaList() {
      const vm = this;
      try {
        console.log(
          cityCountyData
            .find(city => city.CityName === vm.selectedCity)
            .AreaList.map(area => area.AreaName)
        );
        return cityCountyData
          .find(city => city.CityName === vm.selectedCity)
          .AreaList.map(area => area.AreaName);
      } catch (err) {
        return [];
      }
    }
  }
};
</script>
