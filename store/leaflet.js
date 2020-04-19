export const state = () => ({
  map: undefined
});

export const mutations = {
  initMap(state, payload) {
    // const map = L.map("map").setView([23.959786, 120.971388], 8);
    // L.tileLayer(
    //   `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.leafletAccessToken}`,
    //   {
    //     id: "mapbox/streets-v11",
    //     tileSize: 512,
    //     zoomOffset: -1,
    //     accessToken: "your.mapbox.access.token"
    //   }
    // ).addTo(state.map);
    // state.map = payload.map;
  }
};
