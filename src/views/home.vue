<template>
  <div>
    <title-head title="主页"></title-head>
    <div class="contentWrap">
    </div>
  </div>
</template>
<script>
export default {
  components: {
    titleHead: () => import("@/components/public/titleHead.vue")
  },
  //初始化数据
  beforeMount() {
    // this.$axios.get(``).then(res => {});
  }
};
</script>
<style scoped>
</style>
