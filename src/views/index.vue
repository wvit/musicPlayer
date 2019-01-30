<template>
  <div>
    <title-head title="首页"></title-head>

  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {
    titleHead: () => import("@/components/public/titleHead.vue")
  }
};
</script>
<style scoped>
</style>
