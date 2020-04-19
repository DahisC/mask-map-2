let map;
let icons = {};
let markers = {};

export const initMap = () => {
  return new Promise((resolve, reject) => {
    let mapObj = L.map("map").setView([23.959786, 120.971388], 15);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapObj);
    map = mapObj;
    initIcons();
    resolve();
  });
};

export const locateMyself = () => {
  let createRes;
  return new Promise((resolve, reject) => {
    map.locate().once("locationfound", onLocationFound);
    async function onLocationFound(e) {
      map.setView(e.latlng, 15);
      try {
        createRes = await _createMark({ latlng: e.latlng });
        _openPopup({ id: createRes.id });
      } catch (err) {
        await _deleteMark({ id: err.id });
        createRes = await _createMark({ latlng: e.latlng });
        _openPopup({ id: createRes.id });
      }
    }
  });
};

export const _createMark = ({
  id = "Myself",
  latlng,
  icon = "DEFAULT",
  popup = "金罵底家"
}) => {
  return new Promise((resolve, reject) => {
    if (Object.keys(markers).includes(id)) {
      // 存在 -> reject
      reject({ status: false, id });
    } else {
      // 不存在 -> 建立 -> resolve
      markers[id] = L.marker(latlng, { icon: icons[icon] })
        .addTo(map)
        .bindPopup(popup);
      resolve({ status: true, id });
    }
  });
};

export const _deleteMark = ({ id }) => {
  return new Promise((resolve, reject) => {
    // 存在 -> 移除 -> resolve
    if (Object.keys(markers).includes(id)) {
      markers[id].remove();
      delete markers[id];
      resolve();
    } else {
      // 不存在 -> reject
      reject("[ERROR] _deleteMark");
    }
  });
};

export const _openPopup = ({ id, latlng }) => {
  markers[id].openPopup();
  map.panTo(latlng);
};

function initIcons() {
  const MaskIcon = L.Icon.extend({
    options: {
      iconSize: [35, 35],
      popupAnchor: [0, -10]
    }
  });

  icons.DEFAULT = new MaskIcon({ iconUrl: "/icons/default-icon.jpg" });
  icons.MORE = new MaskIcon({ iconUrl: "/icons/more-icon.svg" });
  icons.AVERAGE = new MaskIcon({ iconUrl: "/icons/average-icon.svg" });
  icons.LESS = new MaskIcon({ iconUrl: "/icons/less-icon.svg" });
  icons.SOLDOUT = new MaskIcon({ iconUrl: "/icons/soldout-icon.svg" });
}
