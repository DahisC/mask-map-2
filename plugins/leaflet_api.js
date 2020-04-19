let map;
let icons = {};

export const initMap = () => {
  return new Promise((resolve, reject) => {
    console.log("==========HEROKU V==========");
    console.log(process.env.LEFTLET_ACCESS_TOKEN);
    console.log(process.env.leafletAccessToken);
    let mapObj = L.map("map").setView([23.959786, 120.971388], 8);
    L.tileLayer(
      `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.leafletAccessToken}`,
      {
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: process.env.leafletAccessToken
      }
    ).addTo(mapObj);
    map = mapObj;
    initIcons();
    resolve();
  });
};

export const locateMyself = () => {
  return new Promise((resolve, reject) => {
    map.locate({ setView: true, maxZoom: 16 });
    map.on("locationfound", onLocationFound);
    function onLocationFound(e) {
      resolve(e);
    }
  });
};

export const putAMark = ({ latlng, icon, popup = "NOT SET" }) => {
  return new Promise((resolve, reject) => {
    L.marker(latlng, { icon: icons[icon] })
      .addTo(map)
      .bindPopup(popup)
      .openPopup();
  });
};

function initIcons() {
  const LeafIcon = L.Icon.extend({
    options: {
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76]
    }
  });

  icons.MORE = new LeafIcon({ iconUrl: "/icons/more-icon.svg" });
  icons.AVERAGE = new LeafIcon({ iconUrl: "/icons/average-icon.svg" });
  icons.LESS = new LeafIcon({ iconUrl: "/icons/less-icon.svg" });
  icons.SOLDOUT = new LeafIcon({ iconUrl: "/icons/soldout-icon.svg" });
}
