<template>
  <nuxt />
</template>

<style>
:root {
  --color-main: #0ba29c;
  --color-yellow: #fbb03b;
  --color-red: #d4145a;
  --color-dark-gray: #807e7a;
  --color-gray: #706e6b;
}

@font-face {
  font-family: NotoSansTC-Light;
  src: url("../static/fonts/NotoSansTC-Light.otf");
}

@font-face {
  font-family: NotoSansTC-Thin;
  src: url("../static/fonts/NotoSansTC-Thin.otf");
}

* {
  font-family: NotoSansTC-Light;
}

.leaflet-popup-content {
  min-width: 100px;
  max-width: 300px !important;
  max-height: 600px !important;
}

/* Track */

::-webkit-scrollbar {
  width: 15px;
}

::-webkit-scrollbar-track {
  background-color: rgb(240, 240, 240);
}

::-webkit-scrollbar-thumb {
  background-color: rgba(11, 162, 157, 0.5);
}

.b-overlay > div:nth-child(2) {
  width: 90%;
}
</style>
