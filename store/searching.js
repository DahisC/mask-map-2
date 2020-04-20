const pharmaciesData_API =
  "https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json";

export const state = () => ({
  pharmacies: [],
  searchingCity: "",
  searchingArea: "",
  myLocation: undefined
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
    if (!state.myLocation) {
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

    // const range = 0.05;
    // const mLat = latlng.lat;
    // const mLng = latlng.lng;

    // return state.pharmacies.filter(p => {
    //   const pLat = p.geometry.coordinates[1];
    //   const pLng = p.geometry.coordinates[0];
    //   return (
    //     pLat <= mLat + range &&
    //     pLat >= mLat - range &&
    //     pLng <= mLng + range &&
    //     pLng >= mLng - range
    //   );
    // });
  }
};

export const mutations = {
  updatePharmacies(state, { pharmacies }) {
    state.pharmacies = pharmacies;
  },
  search(state, { cityName, areaName }) {
    state.searchingCity = cityName;
    state.searchingArea = areaName;
  },
  updateMyLocation(state, { latlng }) {
    state.myLocation = latlng;
  }
};

export const actions = {
  async readPharmacies(ctx) {
    try {
      let res = await this.$axios.get(pharmaciesData_API);
      ctx.commit("updatePharmacies", { pharmacies: res.data.features });
    } catch (err) {
      console.error(err);
    }
  }
};
