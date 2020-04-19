<template>
  <b-col id="activity-desc" cols="7">
    <p
      class="font-weight-bold"
      :style="{ color: 'var(--color-main)', fontSize: '1.5em' }"
    >
      貼心小提醒
    </p>
    <p :style="{ color: 'var(--color-gray)' }">今天是身分證末一碼為</p>
    <p>
      「<span
        class="font-weight-bold"
        :style="{ color: 'var(--color-yellow)', fontSize: '1.2em' }"
        >1、3、5、7、9</span
      >」
    </p>
    <p :style="{ color: 'var(--color-gray)' }">的民眾才能購買口罩唷！</p>
  </b-col>
</template>

<style scoped>
div#activity-desc > p {
  margin: 3px;
}
</style>
