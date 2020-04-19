const pharmaciesData_API =
  "https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json";

export const state = () => ({
  pharmacies: [],
  searchingCity: "",
  searchingArea: ""
});

export const getters = {
  filteredPharmacies: state => {
    if (state.searchingCity !== "") {
      return state.pharmacies.filter(p =>
        p.properties.address.includes(state.searchingCity + state.searchingArea)
      );
    } else {
      console.log(state.pharmacies);
      // return state.pharmacies; // default: []
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
