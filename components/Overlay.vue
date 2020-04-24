<template>
  <b-overlay
    id="overlay"
    :show="show"
    blur="0.5em"
    opacity="0.75"
    variant="dark"
  >
    <slot></slot>
    <template v-slot:overlay :style="{ width: '100%' }">
      <div
        id="overlay-content"
        :style="{
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'relative'
        }"
      >
        <div>
          <p class="text-center" :style="{ fontSize: '1.2em' }">口罩地圖</p>
          <ul>
            <li>
              右上角的<b-img
                src="../assets/locate-icon.svg"
                width="30px"
              />可以自動定位並搜尋附近藥局
            </li>
            <li>定位後可以顯示與藥局之間的<BIconArrow90degRight />距離</li>
            <li>
              依照藥局的庫存量在地圖上顯示<span
                :style="{ color: 'var(--color-main)' }"
                >不</span
              ><span :style="{ color: 'var(--color-yellow)' }">同</span
              ><span :style="{ color: 'var(--color-red)' }">顏</span
              ><span :style="{ color: 'gray' }">色</span>的標記
              <ul>
                <li>
                  <b-img src="../assets/more-icon.svg" width="15px" /> 充足
                </li>
                <li>
                  <b-img src="../assets/average-icon.svg" width="15px" /> 普通
                </li>
                <li>
                  <b-img src="../assets/less-icon.svg" width="15px" /> 少量
                </li>
                <li>
                  <b-img src="../assets/soldout-icon.svg" width="15px" /> 售完
                </li>
              </ul>
            </li>
            <li>略微改善了搜尋方式，以減少載入資料的時間</li>
            <li>支援手機介面</li>
          </ul>
        </div>
        <div>
          <b-button
            variant="info"
            @click="show = false"
            :style="{ textAlign: 'center' }"
          >
            我知道了
          </b-button>
        </div>
        <div
          :style="{
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            color: 'antiqueWhite'
          }"
        >
          <p><BIconCodeSlash scale="1" /> DahisC</p>
          <p><BIconPencil scale="1" /> K.T</p>
        </div>
      </div>
    </template>
  </b-overlay>
</template>

<script>
import {
  BIcon,
  BIconArrow90degRight,
  BIconCodeSlash,
  BIconPencil
} from "bootstrap-vue";

export default {
  components: {
    BIcon,
    BIconArrow90degRight,
    BIconCodeSlash,
    BIconPencil
  },
  data() {
    return {
      show: true
    };
  }
};
</script>

<style scoped>
#overlay {
  z-index: 1000;
  overflow: hidden;
}

#overlay-content div {
  margin: 0px 0px;
}

#overlay-content ul {
  color: lightgray;
}
</style>
