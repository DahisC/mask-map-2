let map;
let icons = {};
let markers = {};

export const initMap = () => {
  return new Promise((resolve, reject) => {
    let mapObj = L.map("map").setView([23.959786, 120.971388], 15);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '口罩地圖 &copy; Code: <a target="_blank" href="https://github.com/DahisC/mask-map-2">DahisC</a> / Design: <a target="_blank" href="https://www.behance.net/gallery/93048833/UIUX-?tracking_source=for_you_feed_user_published">K.T</a>'
    }).addTo(mapObj);
    map = mapObj;
    initIcons();
    resolve();
  });
};

export const locateMyself = () => {
  return new Promise((resolve, reject) => {
    map.locate().once("locationfound", onLocationFound);
    async function onLocationFound(e) {
      e.latlng.lat += (Math.random() * 2).toFixed(2) / 10;
      e.latlng.lng += (Math.random() * 2).toFixed(2) / 10;

      map.setView(e.latlng, 15); // 縮近地圖

      const create = await _createMark({ latlng: e.latlng });
      await _openPopup({ id: create.id, latlng: e.latlng });
      resolve({ status: "LOCATED", latlng: e.latlng });
    }
  });
};

export const _createMark = ({
  id = "Myself",
  latlng,
  icon = "DEFAULT",
  popup
}) => {
  return new Promise(async (resolve, reject) => {
    const createFunc = () => {
      markers[id] = L.marker(latlng, { icon: icons[icon] })
        .addTo(map)
        .bindPopup(
          L.popup({ maxWidth: "auto" }).setContent(
            popup ? initContent({ pharmacy: popup }) : whereAmI()
          )
        );
      // .bindPopup(initContent({ pharmacy: popup }));
    };
    if (!Object.keys(markers).includes(id)) {
      createFunc();
      resolve({ status: "CREATED", id });
    } else {
      // 已存在 -> reject
      await _deleteMark({ id });
      createFunc();
      resolve({ status: "DELETED -> CREATED", id });
    }
  });
};

export const _deleteMark = ({ id }) => {
  return new Promise((resolve, reject) => {
    // 存在 -> 移除 -> resolve
    if (Object.keys(markers).includes(id)) {
      markers[id].remove();
      delete markers[id];
      resolve({ status: "DELETED" });
    } else {
      // 不存在 -> reject
      resolve({ status: "NOT EXIST" });
    }
  });
};

export const _openPopup = ({ id, latlng }) => {
  return new Promise((resolve, reject) => {
    markers[id].openPopup();
    map.setView(latlng, 15);
    // map.panTo(latlng);
    resolve();
  });
};

function whereAmI() {
  const choices = [
    "いまここ",
    "金罵底家",
    "你在這裡",
    "You are HERE.",
    "Hello World!"
  ];
  return `<p style="text-align: center;">${
    choices[Math.floor(Math.random() * 5)]
  }</p>`;
}

function initContent({ pharmacy: p }) {
  return `
  <div style="border: 2px solid rgba(0, 0, 0, 0.125); width: 300px; border-radius: 10px 10px 0px 0px; margin-bottom: 58px;">
    <div style="padding: 10px;">
      <div><p style="margin: 0px 0px 10px 0px; font-size: 1.8em; color: #0ba29c; font-weight: bold;">${
        p.name
      }</p></div>
      <div style="color: #706e6b; font-size: 1.2em;"><span><img style="vertical-align: unset;" src="${
        window.location.href
      }icons/Phone.svg" /></span><span style="margin: 10px; color: #706e6b; vertical-align: text-top;">${
    p.phone
  }</span></div>
      <div style="color: #706e6b; font-size: 1.2em;"><span><img style="vertical-align: unset;" src="${
        window.location.href
      }icons/House.svg" /></span><span style="margin: 10px; color: #706e6b; vertical-align: text-top;">${
    p.address
  }</span></div>
      <div style="color: #706e6b; font-size: 1.2em;"><span><img style="vertical-align: unset;" src="${
        window.location.href
      }icons/Calendar.svg" /></span><span style="margin: 10px; color: #706e6b; vertical-align: text-top;">${
    p.note
  }</span></div>
    </div>
    <div>
      <div style="font-size:1.2em; width: calc(50% + 2px); display: inline-block; float: left; padding: 10px; background-color: ${decideContentColor(
        { quantity: p.mask_adult }
      )}; color: white; text-align: center; border: 2px solid rgba(0, 0, 0, 0.125); border-bottom-left-radius: 10px; margin: 0px 0px 0px -2px;">成人 ${
    p.mask_adult
  }</div>
      <div style="font-size:1.2em; width: calc(50% + 2px); display: inline-block; float: right; padding: 10px; background-color: ${decideContentColor(
        { quantity: p.mask_child }
      )}; color: white; text-align: center; border: 2px solid rgba(0, 0, 0, 0.125); border-bottom-right-radius: 10px; margin: 0px -2px 0px 0px;">兒童 ${
    p.mask_child
  }</div>
    </div>
  </div>
  `;
}

function decideContentColor({ quantity }) {
  if (quantity > 100) {
    return "#0ba29c"; // main color
  } else if (quantity > 50) {
    return "#fbb03b"; // yellow
  } else if (quantity > 0) {
    return "#d4145a"; // red
  } else if (quantity === 0) {
    return "#706e6b"; // gray
  } else {
    return "#706e6b"; // gray
  }
}

// export const _createMark = ({
//   id = "Myself",
//   latlng,
//   icon = "DEFAULT",
//   popup = "金罵底家"
// }) => {
//   return new Promise((resolve, reject) => {
//     if (Object.keys(markers).includes(id)) {
//       // 存在 -> reject
//       reject({ status: false, id });
//     } else {
//       // 不存在 -> 建立 -> resolve
//       markers[id] = L.marker(latlng, { icon: icons[icon] })
//         .addTo(map)
//         .bindPopup(popup);
//       resolve({ status: true, id });
//     }
//   });
// };

// export const locateMyself = () => {
//   let createRes;
//   let deleteRes;
//   return new Promise((resolve, reject) => {
//     map.locate().once("locationfound", onLocationFound);
//     async function onLocationFound(e) {
//       e.latlng.lat += (Math.random() * 2).toFixed(2) / 10;
//       e.latlng.lng += (Math.random() * 2).toFixed(2) / 10;

//       map.setView(e.latlng, 15);
//       try {
//         createRes = await _createMark({ latlng: e.latlng });
//         _openPopup({ id: createRes.id, latlng: e.latlng });
//         resolve({ latlng: e.latlng });
//       } catch (err) {
//         deleteRes = await _deleteMark({ id: err.id });
//         console.log(deleteRes);
//         createRes = await _createMark({ latlng: e.latlng });
//         console.log(id, createRes);
//         _openPopup({ id: createRes.id, latlng: e.latlng });
//         resolve({ latlng: e.latlng });
//       }
//     }
//   }).catch(err => {});
// };

// export const _deleteMark = ({ id }) => {
//   return new Promise((resolve, reject) => {
//     // 存在 -> 移除 -> resolve
//     if (Object.keys(markers).includes(id)) {
//       markers[id].remove();
//       delete markers[id];
//       resolve();
//     } else {
//       // 不存在 -> reject
//       reject({ id });
//     }
//   });
// };

// export const _openPopup = ({ id, latlng }) => {
//   return new Promise((resolve, reject) => {
//     markers[id].openPopup();
//     map.panTo(latlng);
//     resolve();
//   }).catch(err => {});
// };

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
