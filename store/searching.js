const pharmaciesData_API =
  process.env.NODE_ENV === "development"
    ? "https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json"
    : "https://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json";

export const state = () => ({
  pharmacies: [],
  searchingCity: "",
  searchingArea: "",
  myLocation: {}, // 初始化時也許要盡量避免 undefined 或 null
  searchingFor: "" // 搜尋模式：定位時回傳附近藥局／搜尋時回傳目標區域藥局
});

export const getters = {
  filteredPharmacies: state => {
    if (state.searchingCity !== "") {
      return state.pharmacies.filter(p =>
        p.properties.address.includes(state.searchingCity + state.searchingArea)
      );
    } else {
      // console.log(state.pharmacies);
      // return state.pharmacies; // default: []
      return [];
    }
  },
  nearbyPharmacies: state => {
    if (Object.keys(state.myLocation).length === 0) {
      return [];
    }
    const range = 0.025;
    const mLat = state.myLocation.lat;
    const mLng = state.myLocation.lng;

    return state.pharmacies.filter(p => {
      const pLat = p.geometry.coordinates[1];
      const pLng = p.geometry.coordinates[0];
      return (
        pLat <= mLat + range &&
        pLat >= mLat - range &&
        pLng <= mLng + range &&
        pLng >= mLng - range
      );
    });
  },
  // 取上方兩個 getter 的聯集以統一渲染
  unionOfPharmacies: (state, getters) => {
    // Set 會自動排除相同的物件
    // 因 Getter 的物件來源一樣（state.pharmacies），所以重複 ID 的物件必定會相同
    // return new Set(
    //   getters.nearbyPharmacies.concat(getters.filteredPharmacies).map(p => p)
    // );

    // 因應搜尋模式改變，不同時列出附近藥局與目標區域藥局
    if (state.searchingFor === "Nearby") {
      return getters.nearbyPharmacies;
    } else if (state.searchingFor === "Area") {
      return getters.filteredPharmacies;
    } else {
      return [];
    }
  }
};

export const mutations = {
  updatePharmacies(state, { pharmacies }) {
    state.pharmacies = pharmacies;
  },
  search(state, { cityName, areaName }) {
    state.searchingCity = cityName;
    state.searchingArea = areaName;
    state.searchingFor = "Area";
  },
  updateMyLocation(state, { latlng }) {
    state.myLocation = latlng;
    state.searchingFor = "Nearby";
  }
};

export const actions = {
  async readPharmacies(ctx) {
    try {
      let res = await this.$axios.get(pharmaciesData_API);
      // alert(pharmaciesData_API);
      ctx.commit("updatePharmacies", { pharmacies: res.data.features });
    } catch (err) {}
  }
};
