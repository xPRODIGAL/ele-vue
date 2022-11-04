<template>
  <div class="header">
    <div class="header-button header-item is-left" v-show="isLeft">
      <i class="fa fa-chevron-left"></i>
      <button @click="$router.go(-1)">返回</button>
    </div>

    <div class="header-item">
      <h1 class="header-title">{{ title }}</h1>
    </div>

    <div class="header-item is-right">
      <i></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: String,
    isLeft: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  background-color: #009eef;
  box-sizing: border-box;
  color: #fff;
  font-size: 16px;
  height: 45px;
  line-height: 1;
  padding: 0 10px;
  white-space: nowrap;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 99;
}

.header-button button {
  background-color: transparent;
  border: none;
  box-shadow: none;
  color: inherit;
  display: inline-block;
}

.header-item {
  flex: 1;
  /* height: 45px; */
}

.header-title {
  text-align: center;
}
.is-left {
  text-align: left;
}
</style>