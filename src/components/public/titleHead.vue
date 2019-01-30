<template>
  <div class="head mainStyleOn">
    <span
      class="goBack"
      @click="goBack"
    ></span>
    <p class="title">
      {{title}}
    </p>
  </div>
</template>
<script>
export default {
  props: {
    title: String
  },
  methods: {
    //返回
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped>
.head {
  position: relative;
  height: 40px;
  margin-bottom: 30px;
}
.title {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
}
.goBack {
  width: 12px;
  height: 12px;
  border: 2px solid #fff;
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
  border-right: none;
  border-top: none;
}
</style>

