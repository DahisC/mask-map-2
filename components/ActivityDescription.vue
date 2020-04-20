<template>
  <b-col id="activity-desc" cols="7">
    <p
      class="font-weight-bold"
      :style="{ color: 'var(--color-main)', fontSize: '1.5em' }"
    >
      貼心小提醒
    </p>
    <template>
      <p :style="{ color: 'var(--color-gray)' }">今天是身分證末一碼為</p>
      <p>
        「<span
          class="font-weight-bold"
          :style="{ color: 'var(--color-yellow)', fontSize: '1.2em' }"
          >{{ whoCanBuyMasks }}</span
        >」
      </p>
      <p :style="{ color: 'var(--color-gray)' }">的民眾才能購買口罩唷！</p>
    </template>
  </b-col>
</template>

<script>
export default {
  data() {
    return {
      day: undefined
    };
  },
  mounted() {
    this.day = new Date().getDay(); // 今天星期幾
  },
  computed: {
    whoCanBuyMasks() {
      if (this.day % 2 === 0) {
        return "2、4、6、8、0";
      } else if (this.day % 2 === 1) {
        return "1、3、5、7、9";
      }
    }
  }
};
</script>

<style scoped>
div#activity-desc > p {
  margin: 3px;
}
</style>
